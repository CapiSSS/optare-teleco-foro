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
  app.listen(8888, () => {
    console.log('Servidor web iniciado')
  })
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + "/client/index.html")
});

app.post('/test', (request, response) => {
  response.sendFile(__dirname + "/client/prueba.html")
})

app.post('/results', (request, response) => {
  console.log('Respuestas:')
  console.log(request.body)
  var qEdadOptare = request.body.edadOptare
  var qViernes = request.body.viernes
  var qOficinas = request.body.oficinas
  var qCodigoEstado = request.body.statuscode
  var qGB = request.body.gb
  if('dieciocho' !== qEdadOptare) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('gominolas' !== qViernes) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('vmmo' !== qOficinas) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('5xx' !== qCodigoEstado) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else if('ardao' !== qGB) {
    response.sendFile(__dirname + "/client/prueba-fallida.html")
  } else {
    response.sendFile(__dirname + "/client/email.html")
  }
})

app.post('/email', (request, response) => {
  db.collection('emails').insertOne(request.body, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(request.body.email + ' saved to database')
    }
    response.sendFile(__dirname + "/client/video.html")
  })
})