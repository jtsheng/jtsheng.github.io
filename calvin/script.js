const endpoint = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "1307007a7da1aeb5b59930a312a42cd3";
const imgUrl = "https://static-resources.zybooks.com/";

const weatherImages = {
  Clear: "clear.png",
  Clouds: "clouds.png",
  Drizzle: "drizzle.png",
  Mist: "mist.png",
  Rain: "rain.png",
  Snow: "snow.png"
};

function getDayName(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
}

function getWeatherImageUrl(weatherType) {
  return imgUrl + (weatherImages[weatherType] || "clear.png");
}

async function getForecast() {
  const url = `${endpoint}?q=Moraga,CA,US&units=imperial&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  return getSummaryForecast(data.list);
}

function getSummaryForecast(forecastList) {
  const forecast = {};
  forecastList.forEach(item => {
    const date = item.dt_txt.substr(0, 10);
    const temp = item.main.temp;
    if (date in forecast) {
      if (temp < forecast[date].low) forecast[date].low = temp;
      if (temp > forecast[date].high) forecast[date].high = temp;
    } else {
      forecast[date] = { high: temp, low: temp, weather: item.weather[0].main };
    }
  });
  return forecast;
}

window.addEventListener("DOMContentLoaded", () => {
  getForecast()
    .then(forecast => {
      const date = Object.keys(forecast)[0];
      const { high, low, weather } = forecast[date];
      document.getElementById("day").textContent = getDayName(date);
      document.getElementById("high").textContent = Math.round(high) + "°F";
      document.getElementById("low").textContent = Math.round(low) + "°F";
      const img = document.getElementById("weather-img");
      img.src = getWeatherImageUrl(weather);
      img.alt = weather;
    })
    .catch(err => {
      const el = document.getElementById("error");
      el.textContent = err.message;
      el.style.display = "block";
    });
});
const imageInfo = [
  "This is one of many beautiful pathways through the heart of SMC campus, lined with pine trees.",
  "The Chapel, dedicated in 1928, is the centerpiece of Saint Mary's Architecture.",
  "The view at the cross is one of the best in the bay area, looking over all of Lamorinda."
];

document.querySelectorAll(".images img").forEach((img, index) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    const existing = document.getElementById("img-info-box");
    if (existing && existing.dataset.index === String(index)) {
      existing.remove();
      return;
    }
    if (existing) existing.remove();

    const box = document.createElement("div");
    box.id = "img-info-box";
    box.dataset.index = index;
    box.textContent = imageInfo[index];
    document.querySelector(".images").after(box);
  });
});
function checkForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const errors = [];

  const existing = document.getElementById("form-errors");
  if (existing) existing.remove();

  if (!name.value.trim()) {
    errors.push("Name is required.");
  } else if (!/^[A-Za-z\s'-]+$/.test(name.value.trim())) {
    errors.push("Name can only contain letters.");
  } else if (name.value.trim().split(/\s+/).length < 2) {
    errors.push("Please enter your full name.");
  }

  const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
  if (!email.value.trim() || !emailReg.test(email.value.trim())) {
    errors.push("Invalid or missing email address.");
  }

  if (!message.value.trim() || message.value.trim() === "Submit your own pictures or other suggestions for the website!") {
    errors.push("Please enter a message.");
  }

  if (errors.length > 0) {
    const box = document.createElement("div");
    box.id = "form-errors";
    box.innerHTML = errors.map(e => `<p>⚠ ${e}</p>`).join("");
    document.querySelector(".form").prepend(box);
    return false;
  }

  return true;
}

document.querySelector("form input[type='submit']").addEventListener("click", (e) => {
  e.preventDefault();
  if (checkForm()) {
    document.querySelector("form").submit();
  }
});

const colleges = [
  "UC Berkeley",
  "Stanford University",
  "Santa Clara University",
  "UC Davis",
  "San Francisco State University",
  "Loyola Marymount University",
  "University of San Francisco",
  "Cal Poly San Luis Obispo",
  "Pepperdine University"
];

const selectElement = document.getElementById("college2");
colleges.forEach(college => {
  const option = document.createElement("option");
  option.value = college.toLowerCase().replace(/\s/g, "");
  option.textContent = college;
  selectElement.appendChild(option);
});
document.querySelector(".compare").addEventListener("click", () => {
  const college1 = document.getElementById("college1").value;
  const college2 = document.getElementById("college2").value;

  const existing = document.getElementById("comparison-result");
  if (existing) existing.remove();

  const result = document.createElement("p");
  result.id = "comparison-result";
  if (!college1 || !college2) {
    result.textContent = "Please select a college in both dropdowns.";
    result.style.color = "red";
  } else {
    result.textContent = "Saint Mary's is better! 🎉";
    result.style.color = "gold";
  }
  document.querySelector(".comparison").appendChild(result);
});