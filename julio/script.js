//is oliver hall open/closed? function
function checkIfOpen()
{
  var now = new Date();
  var day = now.getDay();
  var currentMinutes = now.getHours() * 60 + now.getMinutes(); //hours since midnight; 460 for test open, 0 for test closed
  var isWeekday = (day >= 1 && day <= 5);
  // only regular schedule hours, doing open/closed for all special schedules would be too much
  var breakfastStart = 7 * 60 + 30;
  var breakfastEnd = 10 * 60 + 30;
  var lunchStart = 11 * 60;
  var lunchEnd = 14 * 60;
  var dinnerStart = 16 * 60 + 45;
  var dinnerEnd = 20 * 60;

  var open = false;

  if(isWeekday)
  {
    if (currentMinutes >= breakfastStart && currentMinutes < breakfastEnd){
      open = true;
    } else if (currentMinutes >= lunchStart && currentMinutes < lunchEnd){
      open = true;
    } else if (currentMinutes >= dinnerStart && currentMinutes < dinnerEnd){
      open = true;
    }
  }

  var statusText = document.getElementById("status-text");

  if (open) {
    statusText.textContent = "We are currently open.";
    statusText.className = "status-open";
  } else {
    statusText.textContent = "Sorry, we are currently closed.";
    statusText.className = "status-closed";
  }
}
checkIfOpen();

// weather function (image and temperature)
function loadWeather() {
  var endpoint = "https://api.openweathermap.org/data/2.5/weather"
  var apiKey = "1307007a7da1aeb5b59930a312a42cd3"
  var url = endpoint + "?q=Moraga,CA,US&units=imperial&appid=" + apiKey;

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    if (xhr.status === 200)
      {
        var data = xhr.response;
        var temp = Math.round(data.main.temp);
        var weatherMain = data.weather[0].mean;
        var iconSrc;
        if (weatherMain === "Clear" && temp >= 80) 
        {
          iconSrc = "https://em-content.zobj.net/source/microsoft/319/sun_2600-fe0f.png";
        }
        else if (weatherMain === "Clear" || weatherMain === "Mist" || weatherMain === "Drizzle")
        {
          iconSrc = "https://em-content.zobj.net/source/microsoft/310/sun-behind-small-cloud_1f324-fe0f.png";
        }
        else
        {
          iconSrc = "https://em-content.zobj.net/source/microsoft/310/cloud_2601-fe0f.png";
        }

        var iconImg = document.getElementById("weather-icon");
        iconImg.src = iconSrc;
        iconImg.alt = weatherMain;
        document.getElementById("weather-temp").textContent = temp + "°F";
      }
  });

  xhr.responseType = "json";
  xhr.open("GET", url);
  xhr.send();
}
loadWeather();


// signup form, error checking with regex
var signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event)
{
  event.preventDefault();
  
  var emailInput = document.getElementById("email");
  var emailError = document.getElementById("emailError");
  var email = emailInput.value.trim();

  emailError.textContent = "";
  emailInput.classList.remove("input-error");
  
  if (email === "")
  {
    emailError.textContent = "Please enter an email address.";
    emailInput.classList.add("input-error");
    return;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(email))
  {
    emailError.textContent = "Please enter a valid email address";
    emailInput.classList.add("input-error");
    return;
  }
  
  emailError.textContent = "";
  emailInput.classList.remove("input-error");
  alert("Thank you! You have been successfully signed up.");
  signupForm.reset();
});