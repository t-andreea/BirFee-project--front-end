function set_error(message) {
  alert(message);
}

function sendRequest() {
  var nr1 = document.getElementById("no1").value;
  var nr2 = document.getElementById("no2").value;

  if (nr1 == "" || nr2 == "") {
      set_error("No number added!");
  }

  if (isNaN(nr1) || isNaN(nr2)) {
      set_error("Only numbers!");
  }

  var http = new XMLHttpRequest();
  var url = "http://localhost:5000/decrease";
  var params = "nr1=" + nr1 + "&nr2=" + nr2;
  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
       if(http.readyState == 4 && http.status == 200) {
           var a = JSON.parse(http.responseText);
           alert(a.content);
       }
  }

  http.send(params);
  }
