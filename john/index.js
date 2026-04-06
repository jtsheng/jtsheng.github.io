function init() {
    const detailsButton = document.getElementById("details-toggle");
    const panel = document.getElementById("course-panel");
    const yearNode = document.getElementById("year");
    const form = document.getElementById("interest-form");
    const status = document.getElementById("form-status");
    const weatherButton = document.getElementById("weather-btn");
    const weatherStatus = document.getElementById("weather-status");

    if (yearNode) {
        const now = new Date();
        yearNode.textContent = String(now.getFullYear());
    }

    if (detailsButton && panel) {
        detailsButton.addEventListener("click", function () {
            const open = panel.hasAttribute("hidden");
            if (open) {
                panel.removeAttribute("hidden");
                detailsButton.setAttribute("aria-expanded", "true");
                detailsButton.textContent = "Hide classes";
            } else {
                panel.setAttribute("hidden", "hidden");
                detailsButton.setAttribute("aria-expanded", "false");
                detailsButton.textContent = "Show some classes";
            }
        });
    }

    if (form && status) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            status.textContent = "Thanks! Your form will go nowhere as this is just an assignment.";
            form.reset();
        });
    }
    if (weatherButton && weatherStatus) {
        weatherButton.addEventListener("click", function () {
            weatherStatus.textContent = "Loading weather...";

            const pointsUrl = "https://api.weather.gov/points/37.84163100572851,-122.10951720235505";

            fetch(pointsUrl)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Points request failed");
                    }
                    return response.json();
                })
                .then(function (pointData) {
                    if (!pointData.properties || !pointData.properties.forecast) {
                        throw new Error("Forecast URL not found");
                    }
                    return fetch(pointData.properties.forecast);
                })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Forecast request failed");
                    }
                    return response.json();
                })
                .then(function (forecastData) {
                    const periods = forecastData.properties && forecastData.properties.periods;
                    if (!periods || periods.length === 0) {
                        weatherStatus.textContent = "Weather data is unavailable right now.";
                        return;
                    }

                    const firstPeriod = periods[0];

                    weatherStatus.textContent =
                        "Moraga forecast: " +
                        firstPeriod.name +
                        ", " +
                        firstPeriod.temperature +
                        "°" +
                        firstPeriod.temperatureUnit +
                        ", " +
                        firstPeriod.shortForecast +
                        ". Wind: " +
                        firstPeriod.windSpeed +
                        " " +
                        firstPeriod.windDirection +
                        ".";
                })
                .catch(function () {
                    weatherStatus.textContent = "Could not load weather. Please try again.";
                });
        });
    }
}

window.onload = init;