function getWeatherForecast() {
   const endpoint = "https://api.openweathermap.org/data/2.5/forecast";
//    const apiKey = "1307007a7da1aeb5b59930a312a42cd3";
   const queryString = `q=Moraga&units=metric&appid=1307007a7da1aeb5b59930a312a42cd3`;

    fetch(`${endpoint}?${queryString}`)
        .then(response => response.json())
        .then(data => {
            const forecastList = data.list.slice(0, 5);
            document.getElementById("weathertemp").innerHTML = forecastList[0].main.temp + "°C, " + forecastList[0].weather[0].description
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

window.addEventListener("load", (event) => {
  getWeatherForecast()
});

function validateEmailForm() {
    const form = document.getElementById('tourform');
    form.addEventListener('submit', (event) => {
        const emailInput = document.getElementById('email');
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@stmarys-ca\.edu$/;
        
        if (!emailRegex.test(email)) {
            event.preventDefault();
            alert('Please enter a valid St. Mary\'s email address (@stmarys-ca.edu)');
        }

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (!isChecked) {
            event.preventDefault();
            alert('Please select at least one building option');
        }
    });
}

window.addEventListener("load", () => {
    getWeatherForecast();
    validateEmailForm();
});