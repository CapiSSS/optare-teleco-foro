const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.use(express.static(__dirname + '/client', {index: 'competition.html'}))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

var db

MongoClient.connect('mongodb+srv://optare:0pt4r3s0lut10ns@foro-teleco-sy7ow.gcp.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('foro-teleco')
  db.collection('emails').createIndex( { email: 1 }, { unique: true } )
  db.collection('competition').createIndex( { email: 1 }, { unique: true } )
  app.listen(2002, () => {
    console.log('Servidor web iniciado en el puerto 2002')
  })
})

app.get('/unauthorized', function(request, response) {
  response.sendFile(__dirname + "/client/unauthorized.html")
})

app.post('/unauthorized', function(request, response) {
  response.redirect("/")
})

app.post('/competition', function(request, response) {
  if (request.body.email == null) {
    response.status(401).send('Introduce un email')
  } else {
    db.collection('emails').findOne({"email":request.body.email}, (err, result) => {
      if (err) {
        console.log(err)
        response.status(500).send('Ha ocurrido un error al verificar tu cuenta de email. Vuelve a intentarlo.')
      } else {
        if (result == null) {
          response.redirect('/unauthorized')
        } else {
          request.body.fecha_inicio = getFormattedDate()
          db.collection('competition').insertOne(request.body, (err2, result2) => {
            if (err2) {
              console.log(request.body.fecha_inicio + ' - ' + request.body.email + ' had already started the competition before (see "fecha_inicio" in database)')
              console.log(err2)
            } else {
              console.log(request.body.fecha_inicio + ' - ' + request.body.email + ' starts competition')
            }
            response.download(__dirname + "/client/StarWars-Challenge.zip")
          })
        }
      }
    })
  }
})

app.get('/2d0k2043s7980423l20d8slim7ism', (request, response) => {
  db.collection('emails').find({}).sort( { fecha: -1 } ).toArray(function(err, result) {
    if (err) {
      console.log(err)
    } else {
      db.collection('competition').find({}).sort( { fecha_inicio: -1 } ).toArray(function(err2, result2) {
        var resultado = result2.map(x => Object.assign(x, result.find(y => y.email === x.email)))
        var output = '<html><header><title>Reto Foro Tecnoloxico Optare</title></header><body>'
        output += '<h1>Lista de correos</h1>'
        output += '<h3>Total: ' + resultado.length + '</h3>'
        output += '<table border="1"><tr><td><b>' + 'Inicio' + '</b></td><td><b>' + 'Nombre' + '</b></td><td><b>' + 'Email' + '</b></td><td><b>' + 'Fecha' + '</b></td><td><b>' + 'Respuestas' + '</b></td></tr>'
        resultado.forEach(function(item){
          output += '<tr><td>' + item.fecha_inicio + '</td><td>' + item.nombre + '</td><td>' + item.email + '</td><td>' + item.fecha + '</td><td>' + item.responses + '</td></tr>'
        });
        output += '</table></body></html>'
        response.send(output)
      })
    }
  });
})

function getFormattedDate() {
  var d = new Date()
  var fecha = "" + d.getFullYear() + "-" + appendLeadingZeroes(d.getMonth() + 1) + "-" + appendLeadingZeroes(d.getDate())
  fecha += " " + appendLeadingZeroes(d.getHours()) + ":" + appendLeadingZeroes(d.getMinutes()) + ":" + appendLeadingZeroes(d.getSeconds())
  return fecha
}

function appendLeadingZeroes(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}