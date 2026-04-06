/*
using open-meteo, an open-source weather api: https://open-meteo.com/
need longitude and latitude of moraga, ca (which can be located on the api website)

edit: i tried to get this to work but its not displaying, sorry. the lack of errors doesn't give me much to work with.
*/

const MORAGA_LAT = 37.8349;
const MORAGA_LON = -122.1302;

const WMO_CODES = {
  0: { label: "Clear Sky"},
  1: { label: "Mainly Clear"},
  2: { label: "Partly Cloudy"},
  3: { label: "Overcast"},
  45: { label: "Foggy"},
  48: { label: "Icy Fog"},
  51: { label: "Light Drizzle"},
  53: { label: "Drizzle"},
  55: { label: "Heavy Drizzle"},
  61: { label: "Light Rain"},
  63: { label: "Rain"},
  65: { label: "Heavy Rain"},
  71: { label: "Light Snow"},
  73: { label: "Snow"},
  75: { label: "Heavy Snow"},
  80: { label: "Rain Showers"},
  81: { label: "Heavy Showers"},
  95: { label: "Thunderstorm"},
  99: { label: "Severe Thunderstorm"}
}

function celsiusToFahrenheit(c) {
  return Math.round(c * 9 / 5 + 32);
}

function msToMph(ms) {
  return Math.round(ms * 2.237);
}

async function loadWeather() {
  const loading = document.getElementById("weatherLoading")
  const content = document.getElementById("weatherContent")
  const error = document.getElementById("weatherError")

  try {
    const url = `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${MORAGA_LAT}&longitude=${MORAGA_LON}` +
                `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
                `&temperature_unit=fahrenheit` +
                `&wind_speed_unit=mph` +
                `&timezone=America%2FLos_Angeles`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();

    const cur = data.current;
    const code = cur.weather_code;
    const wmo = WMO_CODES[code] || { label: "Unknown"};
    
    const tempEl = document.getElementById("weatherTemp");
    if (tempEl) tempEl.textContent = `${Math.round(cur.temperature_2m)}°F`;

    const descEl = document.getElementById("weatherDesc");
    if (descEl) descEl.textContent = wmo.label;

    const feelsEl = document.getElementById("weatherFeels");
    if (feelsEl) feelsEl.textContent = `${Math.round(cur.apparent_temperature)}°F`;

    const humidityEl = document.getElementById("weatherHumidity");
    if (humidityEl) humidityEl.textContent = `${cur.relative_humidity_2m}%`;

    const windEl = document.getElementById("weatherWind");
    if (windEl) windEl.textContent = `${Math.round(cur.wind_speed_10m)} mph`;

    if (loading) loading.style.display = "none";
    if (content) content.style.display = "flex";
  } catch (err) {
    console.error("Weather fetch failed: ", err);
    if (loading) loading.style.display = "none";
    if (error) error.style.display = "flex";
  }
}

document.addEventListener('DOMContentLoaded', loadWeather);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CHARS = 500;
 
function setError(inputId, errId, msg) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (!input || !err) return;
  if (msg) {
    input.classList.add("invalid");
    err.textContent = msg;
  } else {
    input.classList.remove("invalid");
    err.textContent = "";
  }
}
 
function clearError(inputId, errId) {
  setError(inputId, errId, "");
}
 
document.getElementById("firstName")?.addEventListener("input", () => {
  if (document.getElementById("firstName").value.trim()) {
    clearError("firstName", "firstNameErr");
  }
});
 
document.getElementById("lastName")?.addEventListener("input", () => {
  if (document.getElementById("lastName").value.trim()) {
    clearError("lastName", "lastNameErr");
  }
});
 
document.getElementById("email")?.addEventListener("input", () => {
  const val = document.getElementById("email").value.trim();
  if (EMAIL_RE.test(val)) clearError("email", "emailErr");
});
 
document.getElementById("year")?.addEventListener("change", () => {
  if (document.getElementById("year").value) {
    clearError("year", "yearErr");
  }
});
 
const messageArea = document.getElementById("message");
const charCount   = document.getElementById("charcount");
 
messageArea?.addEventListener("input", () => {
  const len = messageArea.value.length;
  charCount.textContent = ` ${len} / ${MAX_CHARS}`;
 
  if (len > MAX_CHARS) {
    charCount.style.color = "red";
    setError("message", "messageErr", `Message must be ${MAX_CHARS} characters or fewer.`);
  } else {
    charCount.style.color = "";
    clearError("message", "messageErr");
  }
});
 
document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstNameEl = document.getElementById("firstName");
  const lastNameEl = document.getElementById("lastName");
  const emailEl = document.getElementById("email");
  const yearEl = document.getElementById("year");
  const messageEl = document.getElementById("message");
  const statusEl = document.getElementById("formStatus");

  if (!firstNameEl || !lastNameEl || !emailEl || !yearEl || !messageEl || !statusEl) {
    console.error("Form elements not found");
    return;
  }

  const firstName = firstNameEl.value.trim();
  const lastName = lastNameEl.value.trim();
  const email = emailEl.value.trim();
  const year = yearEl.value;
  const message = messageEl.value;
 
  let hasError = false;
 
  if (!firstName) {
    setError("firstName", "firstNameErr", "First name is required.");
    hasError = true;
  } else {
    clearError("firstName", "firstNameErr");
  }
 
  if (!lastName) {
    setError("lastName", "lastNameErr", "Last name is required.");
    hasError = true;
  } else {
    clearError("lastName", "lastNameErr");
  }
 
  if (!email) {
    setError("email", "emailErr", "Email address is required.");
    hasError = true;
  } else if (!EMAIL_RE.test(email)) {
    setError("email", "emailErr", "Please enter a valid email address.");
    hasError = true;
  } else {
    clearError("email", "emailErr");
  }
 
  if (!year) {
    setError("year", "yearErr", "Please select your year or status.");
    hasError = true;
  } else {
    clearError("year", "yearErr");
  }
 
  if (message.length > MAX_CHARS) {
    setError("message", "messageErr", `Message must be ${MAX_CHARS} characters or fewer.`);
    hasError = true;
  } else {
    clearError("message", "messageErr");
  }
 
  if (hasError) {
    statusEl.textContent = "Please fill in all required fields.";
    statusEl.className = "form-status error";
  } else {
    statusEl.textContent = "Successfully sent!";
    statusEl.className = "form-status success";
    document.getElementById("contactForm").reset();
    const charCountEl = document.getElementById("charcount");
    if (charCountEl) charCountEl.textContent = " 0 / 500";
  }
});
 