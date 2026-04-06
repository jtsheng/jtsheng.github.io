// ── 1. COUNTDOWN TIMER (event-driven: updates every second) ──
const gameDate = new Date('2026-03-28T13:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = gameDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<p style="color:#c8a951;font-size:1.4rem;">Game time! Go Gaels!</p>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent    = days;
  document.getElementById('hours').textContent   = hours;
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000); // event-driven: interval fires every second


// ── 2. WEATHER API (Open-Meteo – free, no key required) ──
document.getElementById('weather-btn').addEventListener('click', async () => {
  const resultDiv = document.getElementById('weather-result');
  resultDiv.style.display = 'block';
  resultDiv.textContent = 'Fetching weather...';

  try {
    // Moraga, CA coordinates; get daily forecast for March 28
    const url = 'https://api.open-meteo.com/v1/forecast' +
      '?latitude=37.835&longitude=-122.130' +
      '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode' +
      '&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles' +
      '&start_date=2026-03-28&end_date=2026-03-28';

    const res  = await fetch(url);
    const data = await res.json();
    const d    = data.daily;

    const code = d.weathercode[0];
    const desc = weatherDescription(code);
    const hi   = d.temperature_2m_max[0];
    const lo   = d.temperature_2m_min[0];
    const rain = d.precipitation_sum[0];

    resultDiv.innerHTML =
      `<strong>Moraga, CA – Saturday March 28</strong><br>
       ${desc}<br>
       High: ${hi}°F &nbsp;|&nbsp; Low: ${lo}°F<br>
       Precipitation: ${rain} mm`;
  } catch (err) {
    resultDiv.textContent = 'Could not load weather. Please try again.';
  }
});

// WMO weather interpretation codes → human-readable
function weatherDescription(code) {
  const map = {
    0: '☀️ Clear sky', 1: '🌤 Mainly clear', 2: '⛅ Partly cloudy',
    3: '☁️ Overcast', 45: '🌫 Foggy', 48: '🌫 Icy fog',
    51: '🌦 Light drizzle', 61: '🌧 Light rain', 63: '🌧 Moderate rain',
    65: '🌧 Heavy rain', 71: '🌨 Light snow', 80: '🌦 Showers',
    95: '⛈ Thunderstorm'
  };
  return map[code] || '🌡 Weather code: ' + code;
}


// ── 3. RSVP FORM with error checking ──
document.getElementById('rsvp-btn').addEventListener('click', () => {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const guests  = document.getElementById('guests').value;
  const msg     = document.getElementById('form-message');

  // Error checks
  if (!name) {
    showMsg(msg, 'Please enter your name.', 'error');
    return;
  }
  if (!email) {
    showMsg(msg, 'Please enter your email.', 'error');
    return;
  }
  if (!email.includes('@')) {
    showMsg(msg, 'Please enter a valid email address.', 'error');
    return;
  }
  if (!guests) {
    showMsg(msg, 'Please select number of guests.', 'error');
    return;
  }

  showMsg(msg, `Thanks, ${name}! See you Saturday. Go Gaels! 🏉`, 'success');

  // Reset form
  document.getElementById('name').value  = '';
  document.getElementById('email').value = '';
  document.getElementById('guests').value = '';
});

function showMsg(el, text, type) {
  el.textContent  = text;
  el.className    = type;
}


// ── 4. ADDITIONAL JS FEATURE: highlight header on scroll ──
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
  } else {
    header.style.boxShadow = 'none';
  }
});
