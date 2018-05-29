var button_value = "";
var connection = "http://localhost:5000";


function init() {
  
  var http = new XMLHttpRequest();
  var url = connection + "/water";
  http.open("GET", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    button_value = a.content;
         }
	 if(button_value == "off") {
	    button_value = "on";
         }
         else {
            button_value = "off";
         }
     }
  }

  http.send();
}


function updateLabel() {

  var http = new XMLHttpRequest();
  var url = connection + "/sensor";
  http.open("GET", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
	 document.getElementById("temp-hum").innerHTML = "Humidity: " + a.content.humidity + "<br/>  Temperature: " + a.content.temperature;
     }
  }

  http.send();
}


function sendRequest() {  

  var http = new XMLHttpRequest();
  var url = connection + "/water";
  var params = "action=" + button_value;
  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    if(button_value == "off") {
	       button_value = "on";
            }
	    else {
   	       button_value = "off";
	    }
	 }
     }
  }

  http.send(params);
}