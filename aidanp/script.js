document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    fetch("https://beta.ourmanna.com/api/v1/get/?format=json")
  .then(response => response.json())
  .then(data => {
    const verseText = data.verse.details.text;
    const reference = data.verse.details.reference;
    document.getElementById("verse").innerText = `"${verseText}" — ${reference}`;
  })
  .catch(error => {
    console.error("Error fetching verse:", error);
    document.getElementById("verse").innerText = "Verse could not load.";
  });
});

function validateEmail(email) {
    if (!email) {
        document.getElementById("error").innerText = "Email is required.";
        return false;
    }
    if (email === "") {
        document.getElementById("error").innerText = "Email is required.";
        return false;
    }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}