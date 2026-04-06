window.addEventListener("DOMContentLoaded", function () {
   
   const form = document.getElementById("interestForm");
   const formMessage = document.getElementById("formMessage");

   form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();

      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

      if (name === "" || phone === "" || email === "") {
         formMessage.textContent = "Please fill out all fields.";
         formMessage.style.color = "red";
      }
      else if (!phonePattern.test(phone)) {
         formMessage.textContent = "Phone number must be in this format: xxx-xxx-xxxx";
         formMessage.style.color = "red";
      }
      else {
         formMessage.textContent = "Thank you for your interest in Club Tennis!";
         formMessage.style.color = "green";
         form.reset();
      }
   });

   
   const infoBtn = document.getElementById("infoBtn");
   const extraInfo = document.getElementById("extraInfo");

   infoBtn.addEventListener("click", function () {
      if (extraInfo.textContent === "") {
         extraInfo.textContent = "Club Tennis is a great way to meet people, stay active, compete in tournaments, and represent Saint Mary's around the Bay Area.";
         infoBtn.textContent = "Hide Club Info";
      }
      else {
         extraInfo.textContent = "";
         infoBtn.textContent = "Show More Club Info";
      }
   });

   
   const weatherBtn = document.getElementById("weatherBtn");
   const weatherResult = document.getElementById("weatherResult");

   weatherBtn.addEventListener("click", function () {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=37.8715&longitude=-122.2730&current=temperature_2m,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph";

      fetch(url)
         .then(function (response) {
            return response.json();
         })
         .then(function (data) {
            const temperature = data.current.temperature_2m;
            const windSpeed = data.current.wind_speed_10m;

            weatherResult.textContent = "Current Berkeley weather: " + temperature + "°F, Wind Speed: " + windSpeed + " mph";
         })
         .catch(function () {
            weatherResult.textContent = "Sorry, weather data could not be loaded right now.";
         });
   });
});