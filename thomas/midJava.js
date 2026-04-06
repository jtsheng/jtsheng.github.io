let test = 0;

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    console.log("worked!");
    document.getElementById("submit").addEventListener("click", displayName)
    
    fetchTemp();
}

async function fetchTemp() {
    lat = "37.839970";
    lon = "-122.110763";
    apiKey = "63543ad5819bc3f49651f32b0fab15b5";
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat={" + lat + "}&lon={" + lon + "}&appid={" + key + "}");
    displayTemp(response.json().main.temp);
}

function displayTemp(temp) {
    let weatherDiv = document.getElementById("weather")

    weatherDiv.innerHTML("<p>At De La Salle, it is currently " + temp + "</p>");
}

function displayName() {
    let test = /[a-zA-Z]/;
    let name = document.getElementById("nameIn")
    if (test.test(name.value)) {
        document.getElementById("name").innerHTML = ""
        document.querySelector("h2").innerHTML = "Welcome, " + name.value + "!"
    }
}


"https://api.openweathermap.org/data/2.5/weather?lat={7.839970}&lon={-122.110763}&appid={63543ad5819bc3f49651f32b0fab15b5}"