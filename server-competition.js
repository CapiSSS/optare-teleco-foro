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
  app.listen(2020, () => {
    console.log('Servidor web iniciado en el puerto 2020')
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
        request.body.fecha_inicio = getFormattedDate()
        db.collection('competition').insertOne(request.body, (err2, result2) => {
          if (err2) {
            response.status(401).send('Ha ocurrido un error al registrar tu cuenta de email: ' err2)
          } else {
            console.log(request.body.email + ' started competition at ' + request.body.fecha_inicio)
            response.download(__dirname + "/client/index.html")
          }
        })
      }
    })
  }
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