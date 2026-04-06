function checkForm() {
   let formError = 0;
   let fullNameError = 0;
   let fullNameInput = document.getElementById("fullName");
   let fullName =fullNameInput.value;
   fullNameInput.classList.remove("error");
   if (fullName.length < 1) {
      fullNameInput.classList.add("error");
      formError = 1;
      fullNameError = 1;
   }
   let emailError = 0;
   let emailInput = document.getElementById("email");
   let email = emailInput.value;
   emailInput.classList.remove("error");
   if (email.length < 1) {
      emailInput.classList.add("error");
      formError = 1;
      emailError = 1;
   }
   let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   if (re.test(email) === false){
      emailInput.classList.add("error");
      formError = 1;
      emailError = 1;
   }
   if (formError !== 0){
      document.getElementById("formErrors").classList.remove("hide");
      let div = document.getElementById("formErrors");
      
      let ulTest = div.querySelector("ul");
      if (ulTest) {
         ulTest.remove();
      }      
      
      let ul = document.createElement("ul");
      if (fullNameError === 1) {
         let li = document.createElement("li");
         li.textContent = "Missing full name.";
         ul.appendChild(li);
         div.appendChild(ul)
      }
      if (emailError === 1) {
         let li = document.createElement("li");
         li.textContent = "Invalid or missing email address.";
         ul.appendChild(li);
         div.appendChild(ul)
      }
   }
   else {
      document.getElementById("formErrors").classList.add("hide");
      fullNameInput.classList.remove("error");
      emailInput.classList.remove("error");
   }
}
async function fetchQuote() {   
   
   let url = "https://wp.zybooks.com/quotes.php?topic=motivational&count=1";
   document.querySelector("#motivationalquote").innerHTML = "<p>Wait for it...</>";
   try {
      console.log(url);
      let response = await fetch(url);
      if (!response.ok) {
         document.querySelector("#quotes").innerHTML = response.status;
         return;
      }
      let quotes = await response.json();
      let html = "<p>";
      for (let quote of quotes) {
         html += "" + quote.quote + " - " + quote.source + "";
      }
      html += "</p";
      document.querySelector("#motivationalquote").innerHTML = html;
   }
   catch (error) {
      document.querySelector("#motivationalquote").innerHTML = error.message;
   }
   
}
function updateClock() {
   const now = new Date();
   document.getElementById("clock").textContent = "Current Time: " + now.toLocaleTimeString();
}
document.querySelector("#submit").addEventListener("click", function(event) {
   checkForm();
   event.preventDefault();
});
document.querySelector("#qtbutton").addEventListener("click", function(event) {
   fetchQuote();
   event.preventDefault();
});
document.addEventListener("DOMContentLoaded", function() {
   fetchQuote();
   setInterval(updateClock, 1000);
});
