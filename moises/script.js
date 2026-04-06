// code to check the form
function checkForm() {
    // get elements from html inputs
    let nameIn = document.getElementById("fullName");
    let emailIn = document.getElementById("email");
    let numberIn = document.getElementById("number");
    let formErrors = document.getElementById("formErrors");

    let name = nameIn.value.trim();
    let email = emailIn.value.trim();
    let phone = numberIn.value.trim();

    // Starts with no errors
    let hasError = false;
    let html = "<ul>";
    
    // removes previous errors
    let inputs = [nameIn, emailIn, numberIn]
    for (let i = 0; i < inputs.length; i ++) {
      inputs[i].classList.remove("error");
    }

    // checks length of name to make sure something is inputed
    if (name.length < 1) {
      html += "<li>Missing full name.</li>";
      nameIn.classList.add("error");
      hasError = true;
    }

    // constraints on email to make sure it has stmarys-ca.edu
    const emailRe = /^[a-zA-Z0-9._-]+@stmarys-ca\.edu$/;
    if (email.length < 1 || emailRe.test(email) == false) {
      html += "<li>Invalid or missing email address.</li>";
      emailIn.classList.add("error");
      hasError = true;
    }

    // makes sure that the phone number is 5 digits long and actual numbers
    if (!/^[0-9]{5}$/.test(phone)) {
    html+= "<li>Invalid number, please enter 5 digits.</li>";
    numberIn.classList.add("error"); 
    hasError = true; 
    } 
    
    html += "</ul>";

    // IF has errors, messages pop up
   if (hasError) {
      formErrors.classList.remove("hide");
      formErrors.innerHTML = html;
   }
   else {
      formErrors.classList.add("hide");
      formErrors.innerHTML = "";
   }
}

// event listener 
document.querySelector("#submit").addEventListener("click", function(event) {
    checkForm();
    event.preventDefault();
});

// fetches api from attitude 37.84 and longitude -122.11 which is smc location
fetch("https://api.open-meteo.com/v1/forecast?latitude=37.840&longitude=-122.110&current_weather=true")
  .then(res => res.json())
  .then(data => {
    document.getElementById("weather").textContent =
    // changes from defult C to F
    "Current temperature: " + (data.current_weather.temperature * 9/5 + 32).toFixed(1) + "°F"
  });