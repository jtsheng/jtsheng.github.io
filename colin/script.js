function checkForm() {
   // Form input boxes
   const fullName = document.getElementById("fullName");
   const email = document.getElementById("email");
   const experience = document.getElementById("experience");

   const successMessage = document.getElementById("successMessage");
   const submitBtn = document.getElementById("submit");
   
   // Check for Errors
   const formErrors = document.getElementById("formErrors");
   formErrors.classList.add("hide");
   let errors = [];

   // Clear previous errors
   fullName.classList.remove("error");
   email.classList.remove("error");
   experience.classList.remove("error");

   // Full name
   if (fullName.value.length < 1) {
      errors.push("Missing full name.");
      fullName.classList.add("error");
   }

   // Email
   if (!/^[a-zA-Z0-9]+@stmarys-ca.edu/.test(email.value)) {
      errors.push("Invalid or missing student email address.");
      email.classList.add("error");
   }

   // Experience
   if (!/^[0-9]/.test(experience.value)) {
      errors.push("Experience must be a number; put &quot;0&quot; if none");
      experience.classList.add("error");
   }



   // Display errors
   if (errors.length > 0) {
      formErrors.classList.remove("hide");

      let errorHTML = "<ul>";
      for (let i = 0; i < errors.length; i++) {
         errorHTML += "<li>" + errors[i] + "</li>";
      }
      errorHTML += "</ul>";

      formErrors.innerHTML = errorHTML;
   }
   else {
        // Display success message when form completed
        formErrors.innerHTML = "";
        submit.classList.add("hide");
        successMessage.classList.remove("hide");
        successMessage.innerHTML = "<p>Thank you for registering! We hope to see you soon!</p>";
   }

}

document.querySelector("#submit").addEventListener("click", function(event) {
   checkForm();

   // Prevent default form action. DO NOT REMOVE THIS LINE
   event.preventDefault();
});

// Weather API url
const URL = "https://api.open-meteo.com/v1/forecast" +
            "?latitude=37.84099" +
            "&longitude=-122.111611" +
            "&current=temperature_2m" +
            "&temperature_unit=fahrenheit";
const display = document.getElementById("weather-display");
// Display loading state while waiting for fetch
let dots = 0;
let intervalId = null;

function startLoadingAnimation() {
   dots = 0;
   intervalId = setInterval(function() {
      dots = (dots % 3) + 1;
      display.textContent = "Temperature Loading" + ".".repeat(dots);
   }, 200);
}

function stopLoadingAnimation() {
   clearInterval(intervalId);
   intervalId = null;
}

function fetchWeather() {
    startLoadingAnimation();
  fetch(URL)
    .then(response => response.json())
    .then(data => {
        stopLoadingAnimation();
      // Dig into the JSON to get the temperature value
      const temp = data.current.temperature_2m;
      display.textContent = `Current temperature on campus: ${temp}°F`;
    })
    .catch(error => {
        stopLoadingAnimation();
      display.textContent = "Could not load weather data.";
      console.error("Weather fetch error:", error);
    });
}

document.getElementById("weatherBtn").addEventListener("click", fetchWeather);