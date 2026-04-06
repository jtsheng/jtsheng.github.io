window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
   document.getElementById("check-weather").addEventListener("click", checkWeatherClick);
   document.getElementById("location").addEventListener("input", locInput);
   document.getElementById("location").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("check-weather").click();
        }
    });
    quotes();
}

// Called when loc input values change
function locInput(e) {
   // Extract the text from loc input that triggered the callback
   const locId = e.target.id;
   const loc = document.getElementById(locId).value.trim();
   
   // Only show error message if no loc 
   if (loc.length === 0) {
      showElement("error-value-" + locId);
   }
   else {
      hideElement("error-value-" + locId);
   }
}

// Check weather button is clicked
function checkWeatherClick() {
   // Get user input
   const loc = document.getElementById("location").value.trim();

   // Show error messages if loc fields left blank
   if (loc.length === 0) {
      showElement("error-value-location");
   }

   // Ensure loc names provided
   if (loc.length > 0) {
      showElement("forecast");
      hideElement("error-loading-location");
      showElement("loading-location");
      showText("loading-location", `Loading ${loc}...`);
      hideElement("results-location");

      // Fetch forecasts
      getWeatherForecast(loc, "location");
   }
}

// Request this loc's forecast
function getWeatherForecast(loc, locId) {
   // Create a URL to access the web API
   const endpoint = "https://api.openweathermap.org/data/2.5/forecast";
   const apiKey = "1307007a7da1aeb5b59930a312a42cd3";
   const queryString = `q=${encodeURI(loc)}&units=imperial&appid=${apiKey}`;
   const url = `${endpoint}?${queryString}`;

   // Use XMLHttpRequest to make http request to web API
   const xhr = new XMLHttpRequest();

   // Call responseReceived() when response is received 
   xhr.addEventListener("load", function () {
      responseReceived(xhr, locId, loc);
   });

   // JSON response needs to be converted into an object
   xhr.responseType = "json";

   // Send request
   xhr.open("GET", url);
   xhr.send();
}

// Display forecast received from JSON  
function responseReceived(xhr, locId, loc) {
   // No longer loading
   hideElement("loading-" + locId);

   // 200 status indicates forecast successfully received
   if (xhr.status === 200) {
      showElement("results-" + locId);

      const locName = xhr.response.city.name;
      showText(locId + "-name", locName);

      // Get 7 day forecast map
      const forecast = getSummaryForecast(xhr.response.list);

      // Put forecast into the loc's table
      let day = 1;
      for (const date in forecast) {
         // Only process the first 7 days
         if (day <= 5) {
            showText(`${locId}-day${day}-name`, getDayName(date));
            showText(`${locId}-day${day}-high`, Math.round(forecast[date].high) + "&deg;");
            showText(`${locId}-day${day}-low`, Math.round(forecast[date].low) + "&deg;");
            showImage(`${locId}-day${day}-image`, forecast[date].weather);
         }
         day++;
      }
   } else {
      // Display appropriate error message
      const errorId = "error-loading-" + locId;
      showElement(errorId);
      showText(errorId, `Unable to load location "${loc}".`);
   }
}

// Return a map of objects that contain the high temp, low temp, and weather for the next 7 days
function getSummaryForecast(forecastList) {  
   // Map for storing high, low, weather
   const forecast = [];
   
   // Determine high and low for each day
   forecastList.forEach(function (item) {
      // Extract just the yyyy-mm-dd 
      const date = item.dt_txt.substr(0, 10);
      
      // Extract temperature
      const temp = item.main.temp;

     // Has this date been seen before?
      if (date in forecast) {         
         // Determine if the temperature is a new low or high
         if (temp < forecast[date].low) {
            forecast[date].low = temp;
         }
         if (temp > forecast[date].high) {
            forecast[date].high = temp;
         }
      }
      else {
         // Initialize new forecast
         const temps = {
            high: temp,
            low: temp,
            weather: item.weather[0].main
         };   
         
         // Add entry to map 
         forecast[date] = temps;
      }
   });
   
   return forecast;
}

// Convert date string into Mon, Tue, etc.
function getDayName(dateStr) {
   const date = new Date(dateStr);
   return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

// Show the element
function showElement(elementId) {
   document.getElementById(elementId).classList.remove("hidden");
}

// Hide the element
function hideElement(elementId) {
   document.getElementById(elementId).classList.add("hidden");
}

// Display the text in the element
function showText(elementId, text) {
   document.getElementById(elementId).innerHTML = text;
}

// Show the weather image that matches the weatherType
function showImage(elementId, weatherType) {   
   // Images for various weather types
   const weatherImages = {
      Clear: "clear.png",
      Clouds: "clouds.png",
      Drizzle: "drizzle.png",
      Mist: "mist.png",
      Rain: "rain.png",
      Snow: "snow.png"
   };

   const imgUrl = "https://static-resources.zybooks.com/";
   const img = document.getElementById(elementId);
   img.src = imgUrl + weatherImages[weatherType];
   img.alt = weatherType;
}

function checkForm() {
    const fName = document.getElementById("fName")
    const lName = document.getElementById("lName")
    const email = document.getElementById("email")
    const cEmail = document.getElementById("cEmail")
    const fErrors = document.getElementById("formErrors");
    const errors = [];

    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    
    fName.classList.remove("error");
    lName.classList.remove("error");
    email.classList.remove("error");
    cEmail.classList.remove("error");
    if (fName.value.trim().length <  1) {
        errors.push("First name is required.");
        fName.classList.add("error");
    } else if (!nameRegex.test(fName.value)) {
        errors.push("First name is not valid.");
        fName.classList.add("error");
    }
    if (lName.value.trim().length < 1) {
        errors.push("Last name is required.");
        lName.classList.add("error");
    } else if (!nameRegex.test(lName.value)) {
        errors.push("Last name is not valid.");
        lName.classList.add("error");
    }
    if (email.value.trim().length < 1) {
        errors.push("Email is required.");
        email.classList.add("error");
    } else if (!emailRegex.test(email.value)) {
        errors.push("Email is not valid.");
        email.classList.add("error");
    }
    if (cEmail.value.trim().length < 1) {
        errors.push("Please confirm your email.");
        cEmail.classList.add("error");
    } else if (email.value !== cEmail.value) {
        errors.push("Emails do not match.");
        cEmail.classList.add("error");
    }
    if (errors.length > 0) {
        fErrors.classList.remove("hide");
        let eHTML = "<ul>";
        for (let i = 0; i < errors.length; i++) {
            eHTML += `<li>${errors[i]}</li>`;
        }
        eHTML += "</ul>";
        fErrors.innerHTML = eHTML;
    } else {
        fErrors.classList.add("hide");
        fErrors.innerHTML = "";
   }
}

document.querySelector("#submit").addEventListener("click", function(e) {
   checkForm();
   e.preventDefault();

});

function quotes() {
   const quotes = document.querySelectorAll(".quotes p");
   let current = 0;

   quotes[current].style.display = "block";
   quotes[current].style.opacity = "1";
   
   function nextQuote() {
      quotes[current].style.opacity = "0";
      setTimeout(() => {
         quotes[current].style.display = "none";
         current = (current + 1) % quotes.length;
         quotes[current].style.display = "block";
         quotes[current].style.opacity = "1";
      }, 1000);
   }
   setInterval(nextQuote, 10000);
}