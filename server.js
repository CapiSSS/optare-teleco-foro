const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.use(express.static(__dirname + '/client'))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

var db

MongoClient.connect('mongodb+srv://optare:0pt4r3s0lut10ns@foro-teleco-sy7ow.gcp.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('foro-teleco')
  db.collection('emails').createIndex( { email: 1 }, { unique: true } )
  app.listen(2002, () => {
    console.log('Servidor web iniciado en el puerto 2002')
  })
})

app.post('/', function(request, response) {
  response.sendFile(__dirname + "/client/index.html")
});

app.post('/test', (request, response) => {
  response.sendFile(__dirname + "/client/prueba.html")
})

app.post('/results', (request, response) => {
  console.log('Respuestas:')
  console.log(request.body)
  /*var qEdadOptare = request.body.edadOptare
  var qViernes = request.body.viernes
  var qContinente = request.body.continente
  var qLenguaje = request.body.lenguaje
  var qCodigoEstado = request.body.statuscode
  var qGB = request.body.gb
  if('dieciocho' !== qEdadOptare) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('gominolas' !== qViernes) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('antartida' !== qContinente) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('todos' !== qLenguaje) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('5xx' !== qCodigoEstado) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('ardao' !== qGB) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else {
    response.sendFile(__dirname + "/client/email.html")
  }*/
  response.sendFile(__dirname + "/client/email.html")
})

app.post('/congratulations', function(request, response) {
  response.sendFile(__dirname + "/client/video.html")
});

app.post('/email', (request, response) => {
  db.collection('emails').insertOne(request.body, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(request.body.email + ' saved to database')
    }
    response.redirect(307, '/congratulations')
  })
})

app.get('/2d0k2043s7980423l20d8slim7ism', (request, response) => {
  db.collection('emails').find({}).sort( { fecha: -1 } ).toArray(function(err, result) {
    if (err) {
      console.log(err)
    } else {
      var output = '<html><header><title>Foro Tecnoloxico Optare</title></header><body>';
      output += '<h1>Lista de correos inscritos</h1>';
      output += '<table border="1"><tr><td><b>' + 'Name' + '</b></td><td><b>' + 'Email' + '</b></td><td><b>' + 'Fecha' + '</b></td><td><b>' + 'Respuestas' + '</b></td></tr>';
      result.forEach(function(item){
        output += '<tr><td>' + item.nombre + '</td><td>' + item.email + '</td><td>' + item.fecha + '</td><td>' + item.responses + '</td></tr>';
      });
      output += '</table></body></html>'
      response.send(output);
    }
  });
})