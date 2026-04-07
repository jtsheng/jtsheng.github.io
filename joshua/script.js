
window.addEventListener("DOMContentLoaded", DOMLoaded);

function DOMLoaded() {
    let submitButton = document.querySelector("#submit");


    let button = document.querySelectorAll("button");
    weather = getWeather();
    drawBook();

    submitButton.addEventListener("click", function (event) {
        //this prevents the form from submitting
        validateForm();
        event.preventDefault();

    });
    //listen for enter key press as well
    submitButton.addEventListener("keydown", function (event) {
        if (event.key === "enter") {
            validateForm();
            event.preventDefault();
        }
    });
    for (let item of button) {
        item.addEventListener("click", function (event) {
            changeText(event.target);
        });
    }

}


function drawBook() {
    let bookCanvas = document.getElementById("bookCanvas");
    let context = bookCanvas.getContext("2d");

    //add a book drawing to the canvas
    context.fillStyle = "#8B4513";
    context.fillRect(0, 0, 120, 120);
    context.fillStyle = "#CD853F";
    //exterior of the book
    context.fillRect(10, 10, 80, 100);
    //add spine
    context.fillStyle = "grey";
    context.fillRect(0, 10, 10, 100);
    //add pages
    context.fillStyle = "white";
    context.fillRect(95, 0, 5, 120);

    //add book text
    context.fillStyle = "white";
    context.font = "16px Helvetica";
    context.fillText("Book", 30, 60);

}


function changeText(item) {

    let receiptCaption = document.getElementById("receiptCaption");
    let bookCaption = document.getElementById("bookCaption");
    let figCaption3 = document.getElementById("figCaption3");

    let bookCanvas = document.getElementById("bookCanvas");
    let context = bookCanvas.getContext("2d");

    //this changes the caption text
    if (item.id == "receiptButton") {
        receiptCaption.textContent = "Since students submit their own requests, I have to make sure the student receipts match up with their requests before I can process them.";

    }
    if (item.id == "bookButton") {
        bookCaption.textContent = "I have to make sure the books have bookmarks so students can easily navigate to each chapter before they can be sent out. We have a large library of books so we can quickly upload the books to the students, but we have to request from the publishers if there is a new edition.";


        //add chapters to the book canvas   
        context.fillStyle = "white";
        context.font = "12px Helvetica";
        context.fillText("Chapter 2", 25, 100);
        context.fillText("Chapter 1", 25, 80);
    }
    if (item.id == "showmore3") {
        figCaption3.textContent = "I sometimes have to caption videos for classes, which I use Adobe Premiere to do. Premiere generates captions automatically, but I have to make sure they are accurate.";

    }
    //hide the button
    item.classList.add("hide");

}



async function getWeather() {
    try {
        let weatherDiv = document.getElementById("weatherDiv");
        let weatherText = document.getElementById("weather");
        let weatherIcon = document.getElementById("weatherIcon");

        //st mary's latitude and longitude
        let lat = 37.8409;
        let long = -122.1089;
        let apiKey = "440bfd94f0b48e04b55792c3b4b2d23e";
        let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

        let response = await fetch(url);
        let json = await response.json();

        if (response.ok) {
            //json returns with current, looking for description and temp
            //weather is an an object with a description array, we want the first element of that array
            let description = json.current.weather[0].description;
            let currentTemp = json.current.temp;


            weatherText.textContent = `Current weather in Moraga: ${currentTemp}°F, ${description}`;

            //this changes the icon and background depending on weather
            if (description.includes("sunny")) {
                weatherIcon.src = "images/sunny-weather.png";
                weatherDiv.style.background = "linear-gradient(lightskyblue, deepskyblue)";
                weatherIcon.alt = "Sunny Weather Icon";
            }
            else if (description.includes("cloud") || description.includes("overcast")) {
                weatherIcon.src = "images/cloudy.png";
                weatherDiv.style.background = "linear-gradient( dimgray, gray)";
                weatherIcon.alt = "Cloudy Weather Icon";
            }
            else if (description.includes("rainy")) {
                weatherIcon.src = "images/rainy.png";
                weatherDiv.style.background = "linear-gradient( #606060, #909090)";
                weatherIcon.alt = "Rainy Weather Icon";
            }
            else {
                weatherIcon.src = "images/sunny-weather.png";
                weatherIcon.alt = "Sunny Weather Icon";
            }


        }
        else {
            weatherText.textContent = "Weather data unavailable";
            weatherIcon.src = "images/sunny-weather.png";
            weatherIcon.alt = "Sunny Weather Icon";
            weatherDiv.appendChild(weatherIcon);
            weatherDiv.style.background = "linear-gradient(lightskyblue, deepskyblue)";

            weatherDiv.appendChild(weatherIcon);


        }
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        weatherText.textContent = "Error fetching weather data.";
    }

}


function validateForm() {
    //getting elements
    let errors = [];
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let year = document.getElementById("year");
    let formErrors = document.getElementById("formErrors");
    let formSuccess = document.getElementById("formSuccess");
    //this is so the success message doesn't show until errors are fixed
    formSuccess.classList.add("hide");


    if (name.value.length < 1) {
        errors.push("Please enter your name.");
        name.classList.add("error");
        name.focus();
    }
    //from User registration Zybooks
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(email.value)) {
        errors.push("Please enter a valid email.")
        email.classList.add("error");
        email.focus();
    }
    //if the user hasn't selected a proper year
    if (year.value === "Select") {
        errors.push("Please select a year.");
        year.classList.add("error");
        year.focus();
    }
    //checking and appending errors
    if (errors.length > 0) {
        //clear previous errors
        formErrors.innerHTML = "";
        //delete the hide class to show the errors
        formErrors.classList.remove("hide");
        let ol = document.createElement("ol");
        for (let error of errors) {
            let li = document.createElement("li");
            li.textContent = error;
            ol.appendChild(li);
        }
        formErrors.appendChild(ol);
    }
    else {
        //clear errors

        formErrors.classList.add("hide");
        formErrors.innerHTML = "";
        name.classList.remove("error");
        email.classList.remove("error");
        year.classList.remove("error");
        //show success message

        formSuccess.classList.remove("hide");
        formSuccess.textContent = "Form submitted successfully.";

    }
}