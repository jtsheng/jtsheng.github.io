// EVENT FEATURE
document.getElementById("factBtn").onclick = function() {
   document.getElementById("fact").innerText =
      "The Saint Mary’s Cross is one of the most recognizable symbols on campus!";
};

// FORM VALIDATION
function submitForm() {
   let input = document.getElementById("spot").value;

   if (input.trim() === "") {
      document.getElementById("error").innerText = "Please enter a response.";
   } else {
      document.getElementById("error").innerText = "Thanks for sharing!";
   }
}

// DARK MODE
function toggleMode() {
   document.body.classList.toggle("dark");
}

// WEATHER API (simple free API)
function getWeather() {
   fetch("https://api.open-meteo.com/v1/forecast?latitude=37.84&longitude=-122.13&current_weather=true")
      .then(response => response.json())
      .then(data => {
         let temp = data.current_weather.temperature;
         document.getElementById("weather").innerText =
            "Current temperature: " + temp + "°C";
      })
      .catch(() => {
         document.getElementById("weather").innerText = "Unable to fetch weather.";
      });
}