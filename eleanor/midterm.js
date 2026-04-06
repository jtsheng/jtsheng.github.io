document.addEventListener("DOMContentLoaded", function () {

    const factButton = document.getElementById("fact-button");
    const factDisplay = document.getElementById("fact-display");

    // backup quotes
    const fallbackQuotes = [
        { content: "Data is the new oil.", author: "Clive Humby" },
        { content: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming" },
        { content: "In God we trust. All others must bring data.", author: "W. Edwards Deming" },
        { content: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina" }
    ];

    factButton.addEventListener("click", function () {

        factButton.classList.add("pop");
        setTimeout(() => {
            factButton.classList.remove("pop");
        }, 150);

        factDisplay.textContent = "Loading motivational quote...";

        fetch("https://api.quotable.io/random")
            .then(response => {
                if (!response.ok) {
                    throw new Error("API response failed");
                }
                return response.json();
            })
            .then(data => {
                const text = `"${data.content}" — ${data.author}`;
                factDisplay.textContent = text;
            })
            .catch(error => {
                console.error("API failed, using fallback:", error);
                const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
                const quote = fallbackQuotes[randomIndex];

                const text = `"${quote.content}" — ${quote.author}`;
                factDisplay.textContent = text;
            });
    });

});