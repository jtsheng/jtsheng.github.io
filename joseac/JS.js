function myMouseoverHandler(event) {
   event.target.style.color = "darkBlue";
}
function myMouseoutHandler(event) {
   event.target.style.color = "black";
}
let title = document.getElementById("title");
title.addEventListener("mouseover", myMouseoverHandler);
title.addEventListener("mouseout", myMouseoutHandler);
let elements = document.querySelectorAll("li");
for (let elem of elements) {
   elem.addEventListener("mouseover", myMouseoverHandler);
   elem.addEventListener("mouseout", myMouseoutHandler);
}
let elements2 = document.querySelectorAll("h2");
for (let elem of elements2) {
   elem.addEventListener("mouseover", myMouseoverHandler);
   elem.addEventListener("mouseout", myMouseoutHandler);
}
function getWeather(lat, long) {
	let endpoint = "https://api.openweathermap.org/data/3.0/onecall";
	let apiKey = "6de324ad37e5617672f0325600a469d0";
	let queryString = "lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + apiKey;
	let url = endpoint + "?" + queryString;
	
	let xhr = new XMLHttpRequest();
	xhr.addEventListener("load", responseReceivedHandler);
	xhr.responseType = "json";
	xhr.open("GET", url);
	xhr.send();
}
function responseReceivedHandler() {
	let weatherInfo = document.getElementById("weather");
	if (this.status === 200) {
		weatherInfo.innerHTML = 
			"<p>Current temp: " + this.response.current.temp + "&deg;F</p>" +
			"<p>Desc: " + this.response.current.weather[0].description + "</p>" +
			"<p>Humidity: " + this.response.current.humidity + "%</p>";
	}
	else {
		weatherInfo.innerHTML = "Weather data unavailable...";
	}
}
getWeather(37.8409741, -122.1095)
function checkForm() {
   // TODO: Perform input validation 
   let formErrors = document.getElementById("formErrors");
   let fullName = document.getElementById("fullName");
   let email = document.getElementById("email");
   let password = document.getElementById("password");
   let passConfirm = document.getElementById("passwordConfirm");
   let hasError = false;
   formErrors.innerHTML = "";
   if (String(fullName.value).length < 1) {
      formErrors.className = null
      formErrors.innerHTML += "<li>Missing full name.</li>\n";
      fullName.className = "error";
      hasError = true;
   }
   let emailExpress = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   if (!emailExpress.test(email.value)) {
      formErrors.className = null
      formErrors.innerHTML += "<li>Invalid or missing email address.</li>\n";
      email.className = "error";
      hasError = true
   }
   if (String(password.value).length < 10 || 20 < String(password.value).length) {
      formErrors.className = null
      formErrors.innerHTML += "<li>Password must be between 10 and 20 characters.</li>\n";
      password.className = "error";
      hasError = true;
   }
   let lowerExpress = /[a-z]/;
   if (!lowerExpress.test(password.value)) {
      formErrors.className = null
      formErrors.innerHTML += "<li>Password must contain at least one lowercase character.</li>\n";
      password.className = "error";
      hasError = true;
   }
   let upperExpress = /[A-Z]/;
   if (!upperExpress.test(password.value)) {
      formErrors.className = null
      formErrors.innerHTML += "<li>Password must contain at least one uppercase character.</li>\n";
      password.className = "error";
      hasError = true;
   }
   let digitExpress = /[0-9]/;
   if (!digitExpress.test(password.value)) {
      formErrors.className = null
      formErrors.innerHTML += "<li>Password must contain at least one digit.</li>\n";
      password.className = "error";
      hasError = true;
   }
   if (password.value != passConfirm.value) {
      formErrors.className = null
      formErrors.innerHTML += "<li>Password and confirmation password don't match.</li>\n";
      password.className = "error";
      passConfirm.className = "error";
      hasError = true;
   }
   if (!hasError) {
      formErrors.className = "hide";
      fullName.className = null;
      email.className = null;
      password.className = null;
      passConfirm.className = null;     
   }
}
document.querySelector("#submit").addEventListener("click", function(event) {
   checkForm();
   event.preventDefault();
});