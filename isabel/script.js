const form = document.getElementById('tryout-form');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const ageError = document.getElementById('age-error');
    const formMessage = document.getElementById('form-message');

    nameError.textContent = '';
    emailError.textContent = '';
    ageError.textContent = '';
    formMessage.textContent = '';

    let hasError = false;

    if (nameInput.value.trim() === '') {
        nameError.textContent = "Name is required.";
        hasError = true;
    }

    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        emailError.textContent = "Please enter a valid email.";
        hasError = true;
    }

    const age = parseInt(ageInput.value);
    if (isNaN(age)) {
        ageError.textContent = "Please enter your age.";
        hasError = true;
    } else if (age < 14 || age > 40) {
        ageError.textContent = "Age must be between 14 and 40.";
        hasError = true;
    }
    if (!hasError) {
        formMessage.textContent = `Thanks for signing up, ${nameInput.value.trim()}! We will contact you at ${emailInput.value.trim()}.`;
        formMessage.style.color = 'green';
        form.reset();
    }
});


async function getWeather() {
    const weatherDiv = document.getElementById("weather");

    const url = "https://api.open-meteo.com/v1/forecast?latitude=37.84&longitude=-122.13&current_weather=true&temperature_unit=fahrenheit";
;

    try {

        const response = await fetch(url);
        const data = await response.json();

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;

        weatherDiv.textContent =
        `Current temperature on campus: ${temp}°F | Wind speed: ${wind} km/h`;

    } catch (error) {

        weatherDiv.textContent = "Unable to load campus weather.";

    }
}
getWeather();

const facts = [
    "Our team has an absurd amount of players who have twins.",
    "Our game against Navy got cancelled due to a bomb threat.",
    "I got an assist against UC Davis to win the game!",
    "The team performs mandatory karaoke on bus rides."
];

function showRandomFact() {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    alert(fact);
}

const factButton = document.createElement('button');
factButton.textContent = "Show Random Fact";
document.body.appendChild(factButton);
factButton.addEventListener('click', showRandomFact);