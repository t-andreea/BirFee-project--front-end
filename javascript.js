function send() {

  var nr1 = document.getElementById('number1').value;
  var nr2 = document.getElementById('number2').value;

  if( isNaN(nr1) || isNaN(nr2) ) {
    alert('Error');
  }

  if( nr1=='' || nr2=='' ) {
    alert('Error');
  }

  var http = new XMLHttpRequest(); //conexiune, unda de transmitere
  var url = "http://localhost:5000/add"
  var params = "nr1=" + nr1 + "&nr2=" + nr2
  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); //ce tip de date asteapta

  http.onreadystatechange = function() {
    if(http.readyState==4 && http.status==200) {
      var response = JSON.parse(http.responseText);
      alert(response.content);
    }
  }

  http.send(params);

  //console.log(nr1);
  //console.log(nr2);

}
