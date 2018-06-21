var button_value_w = "";
var button_value_f = "";
var button_value_m = "";
var connection = "http://localhost:5000";


function waterInit() {

  var http = new XMLHttpRequest();
  var url = connection + "/water";
  http.open("GET", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    button_value_w = a.content;
         }
	 if(button_value_w == "off") {
	    button_value_w = "on";
         }
         else {
            button_value_w = "off";
         }
     }
  }

  http.send();
}


function foodInit() {

  var http = new XMLHttpRequest();
  var url = connection + "/food";
  http.open("GET", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    button_value_f = a.content;
         }
	 if(button_value_f == "off") {
	    button_value_f = "on";
         }
         else {
            button_value_f = "off";
         }
     }
  }

  http.send();
}


function buzzerInit() {

  var http = new XMLHttpRequest();
  var url = connection + "/buzzer";
  http.open("GET", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    button_value_m = a.content;
         }
	 if(button_value_m == "off") {
	    button_value_m = "on";
         }
         else {
            button_value_m = "off";
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

  setTimeout("updateLabel()", 100000);
}


function sendWaterRequest() {

  var http = new XMLHttpRequest();
  var url = connection + "/water";
  var params = "action=" + button_value_w;
  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    if(button_value_w == "off") {
	       button_value_w = "on";
            }
	    else {
   	       button_value_w = "off";
	    }
	 }
     }
  }

  http.send(params);
}


function sendFoodRequest() {

  var http = new XMLHttpRequest();
  var url = connection + "/food";
  var params = "action=" + button_value_f;
  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    if(button_value_f == "off") {
	       button_value_f = "on";
            }
	    else {
   	       button_value_f = "off";
	    }
	 }
     }
  }

  http.send(params);
}


function sendMusicRequest() {

  var http = new XMLHttpRequest();
  var url = connection + "/buzzer";
  var params = "action=" + button_value_m;
  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	    if(button_value_m == "off") {
	       button_value_m = "on";
            }
	    else {
   	       button_value_m = "off";
	    }
	 }
     }
  }

  http.send(params);
}


function timeTransform() {

  var time = document.getElementById("time-picker").value;

  if( !time ) {
    alert("Please choose the hour!");
  }
  else {
    var newTime = "";
    for(i = 0; i < time.length - 3; i++)
        newTime = newTime + time[i];
    return newTime;
  }
}


function sendTimeRequest() {

  var http = new XMLHttpRequest();
  var url = connection + "/timer";
  var myTime = timeTransform();
  var params = "time=" + myTime;
  http.open("POST", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
         if(a.status == 0) {
   	        console.log("Time was set at " + myTime);
	       }
         else {
           alert("Something went wrong, please try again!");
           console.log("Something went wrong");
         }
     }
  }

  http.send(params);
  document.getElementById("hour").innerHTML = myTime;
}


function updateAlarm() {

  var http = new XMLHttpRequest();
  var url = connection + "/timer";
  http.open("GET", url, true);

  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {
     if(http.readyState == 4 && http.status == 200) {
         var a = JSON.parse(http.responseText);
	       document.getElementById("hour").innerHTML = a.content;
    }
  }

  http.send();
  setTimeout("updateAlarm()", 100000);
}
