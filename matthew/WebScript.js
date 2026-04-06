function checkForm() {

   const fullname = document.getElementById("fullName");
   const email = document.getElementById("email");
   const formErrors = document.getElementById("formErrors");

   let errors = [];

   fullname.classList.remove("error");
   email.classList.remove("error");

   if (fullname.value.length === 0) {
      fullname.classList.add("error");
      errors.push("Missing full name.");
   }

   let reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   if (email.value.length === 0 || !reg.test(email.value)) {
      email.classList.add("error");
      errors.push("Invalid or missing email address.");
   }

   if (errors.length > 0) {
      formErrors.classList.remove("hide");

      let html = "<ul>";
      for (let i = 0; i < errors.length; i++) {
         html += `<li>${errors[i]}</li>`; }
      html += "</ul>";

      formErrors.innerHTML = html;
   } else {
      formErrors.classList.add("hide");
      formErrors.innerHTML = "";
   }
}

document.querySelector("#submit").addEventListener("click", function (event) {
   checkForm();

   // Prevent default form action. DO NOT REMOVE THIS LINE
   event.preventDefault();
});


window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);
   });
});



function fetchQuotes(topic, count) {
   // TODO: Modify to use XMLHttpRequest

   const url = `https://wp.zybooks.com/quotes.php?topic=${topic}&count=${count}`;

   const request = new XMLHttpRequest()
   request.addEventListener("load", responseReceivedHandler)
   request.responseType = "json";
   request.open("GET", url)
   request.send()

}

function responseReceivedHandler() {
   // TODO: Complete the function
   const quotes = document.querySelector("#quotes")
   const temp = this.response;
   if (temp.error) {
      const text = document.createElement("p");
      text.textContent = temp.error;
      quotes.appendChild(text);
      return;
   }
   const ol = document.createElement("ol");
   temp.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.quote} - ${item.source}`;
      ol.appendChild(li);
   });
   quotes.appendChild(ol);
}