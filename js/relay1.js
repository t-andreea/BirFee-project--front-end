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


function renderTime() {

  var date = new Date();
  var year = date.getYear();
  var day = date.getDay();
  var month = date.getMonth();
  var daym = date.getDate();

  var dayArray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday");
  var monthArray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

  if(year < 1000) {
    year += 1900;
  }

  var currentTime = new Date();
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var s = currentTime.getSeconds();

  if(h == 24) {
    h = 0;
  }
  if(h < 10) {
    h = "0" + h;
  }
  if(m < 10) {
    m = "0" + m;
  }
  if(s < 10) {
    s = "0" + s;
  }

  document.getElementById("date").innerHTML = "" + dayArray[day] + ", " + daym + " " + monthArray[month] + " " + year;
  document.getElementById("time").innerHTML = "" +  h + ":" + m + ":" + s;

  setTimeout("renderTime()", 1000);
}


function updateLabel() {

  var http = new XMLHttpRequest();
  var url = connection + "/sensor";
  http.open("GET", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
	 document.getElementById("temp").innerHTML = "Temperature: " + a.content.temperature + "˚C";
   document.getElementById("hum").innerHTML = "Humidity: " + a.content.humidity + "%";
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
