function selectDate(element) {
  let items = document.querySelectorAll("#dateList li");
  items.forEach(item => item.classList.remove("active"));

  element.classList.add("active");

  document.getElementById("selectedDateMessage").textContent =
    "You selected: " + element.textContent;
}

function getCampusWeather() {
  const result = document.getElementById("weatherResult");
  result.textContent = "Loading weather...";


    const lat = 37.8427;
    const lon = -122.1122;

     
  fetch(`https://api.weather.gov/points/${lat},${lon}`, {
    headers: {
      "Accept": "application/geo+json"
    }
  })
    .then(response => response.json())
    .then(pointData => {
      const forecastUrl = pointData.properties.forecast;

    
      return fetch(forecastUrl, {
        headers: {
          "Accept": "application/geo+json"
        }
      });
    })
    .then(response => response.json())
    .then(data => {
      const today = data.properties.periods[0];

      result.textContent = `Current on campus: ${today.temperature}°${today.temperatureUnit}, ${today.shortForecast}`;
    })
    .catch(error => {
      result.textContent = "Unable to load campus weather.";
      console.error(error);
    });
}

function toggleForm() {
  const form = document.getElementById("registrationForm");

  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("formMessage");

  
  message.style.color = "red";

  
  if (name === "") {
    message.textContent = "Please enter your name.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    message.textContent = "Please enter a valid email address.";
    return;
  }

  if (guests === "" || guests < 0 || guests > 2) {
    message.textContent = "Guests must be between 0 and 2.";
    return;
  }

  
  message.style.color = "green";
  message.textContent = "Registration successful! Welcome to SMC!";
}

let moved = false;

function moveLogo() {
  const logo = document.getElementById("logo");

  if (!logo) {
    console.log("Logo element not found");
    return;
  }

  if (!moved) {
    logo.style.left = "75%";
    moved = true;
  } else {
    logo.style.left = "0";
    moved = false;
  }
}