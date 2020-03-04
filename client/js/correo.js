var respuestas = "{'edadOptare':'" + sessionStorage.getItem('edadOptare') + "',"
respuestas += "'viernes':'" + sessionStorage.getItem('viernes') + "',"
respuestas += "'continente':'" + sessionStorage.getItem('continente') + "',"
respuestas += "'lenguaje':'" + sessionStorage.getItem('lenguaje') + "',"
respuestas += "'statuscode':'" + sessionStorage.getItem('statuscode') + "',"
respuestas += "'gb':'" + sessionStorage.getItem('gb') + "'}"
document.getElementById("responses").value = respuestas
var d = new Date()
document.getElementById("fecha").value = "" + d.getFullYear() + "-" + appendLeadingZeroes(d.getMonth() + 1) + "-" + appendLeadingZeroes(d.getDate()) + " " + appendLeadingZeroes(d.getHours()) + ":" + appendLeadingZeroes(d.getMinutes()) + ":" + appendLeadingZeroes(d.getSeconds())

function appendLeadingZeroes(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}