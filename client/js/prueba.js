var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Enviar";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    var edadOptare = document.querySelector('input[name="edadOptare"]:checked')
    var viernes = document.querySelector('input[name="viernes"]:checked')
    var continente = document.querySelector('input[name="continente"]:checked')
    var lenguaje = document.querySelector('input[name="lenguaje"]:checked')
    var statuscode = document.querySelector('input[name="statuscode"]:checked')
    var gb = document.querySelector('input[name="gb"]:checked')
    sessionStorage.setItem('edadOptare', edadOptare ? edadOptare.value : '')
    sessionStorage.setItem('viernes', viernes ? viernes.value : '')
    sessionStorage.setItem('continente', continente ? continente.value : '')
    sessionStorage.setItem('lenguaje', lenguaje ? lenguaje.value : '')
    sessionStorage.setItem('statuscode', statuscode ? statuscode.value : '')
    sessionStorage.setItem('gb', gb ? gb.value : '')
    document.getElementById("regForm").submit();
  } else {
    showTab(currentTab);      
  }
}