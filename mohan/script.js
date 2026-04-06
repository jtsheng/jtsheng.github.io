function loadMoragaWeather() {
  var lat = 37.8349;
  var lon = -122.1297;
  var url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat +
    "&longitude=" +
    lon +
    "&current=temperature_2m,relative_humidity_2m,weather_code&temperature_unit=fahrenheit";

  var el = document.getElementById("weatherText");
  if (!el) {
    return;
  }

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data && data.current) {
        var t = data.current.temperature_2m;
        var hum = data.current.relative_humidity_2m;
        el.textContent =
          "Right now in Moraga it is about " + t + " °F with " + hum + "% humidity.";
      } else {
        el.textContent = "Unavailable.";
      }
    })
    .catch(function () {
      el.textContent =
        "Unavailable at this time.";
    });
}

var alumniList = [
  {
    name: "Patty Mills",
    img: "images/patty-mills.png",
    bio:
      "Patty Mills played basketball at Saint Marys and became an NBA champion with the Spurs. He also plays for Australia internationally.",
  },
  {
    name: "Matthew Dellavedova",
    img: "images/dellavedova.png",
    bio:
      "Matthew Dellavedova ('Delly') starred at SMC then played in the NBA (Cavs championship 2016).",
  },
  {
    name: "Mahershala Ali",
    img: "images/mahershala-ali.png",
    bio:
      "Mahershala Ali attended Saint Marys on a basketball scholarship then transferred but is still often mentioned in SMC alumni lists. He won Oscars for acting (Moonlight, Green Book).",
  },
  {
    name: "Tami Reller",
    img: "images/tami-reller.png",
    bio:
      "Tami Reller is a Microsoft executive who held leadership roles for products: Windows and Surface.",
  },
  {
    name: "Jason Shellen",
    img: "images/jason-shellen.png",
    bio:
      "Jason Shellen worked on early Google Reader and blogging products. He is an SMC grad connected to tech and media.",
  },
];

function makeGallery() {
  var container = document.getElementById("gallery");
  for (var i = 0; i < alumniList.length; i++) {
    var person = alumniList[i];

    var card = document.createElement("div");
    card.className = "flip-card";
    card.setAttribute("tabindex", "0");

    var inner = document.createElement("div");
    inner.className = "flip-inner";

    var front = document.createElement("div");
    front.className = "flip-front";
    var im = document.createElement("img");
    im.src = person.img;
    im.alt = person.name;
    var cap = document.createElement("div");
    cap.className = "card-caption";
    cap.textContent = person.name;
    front.appendChild(im);
    front.appendChild(cap);

    var back = document.createElement("div");
    back.className = "flip-back";
    var h = document.createElement("h3");
    h.textContent = person.name;
    var p = document.createElement("p");
    p.textContent = person.bio;
    back.appendChild(h);
    back.appendChild(p);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", function (ev) {
      var targetCard = ev.currentTarget;
      targetCard.classList.toggle("is-flipped");
    });

    container.appendChild(card);
  }
}

function setupForm() {
  var form = document.getElementById("interestForm");
  var msg = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.className = "form-msg";
    msg.textContent = "";

    var nameVal = document.getElementById("fullName").value.trim();
    var sem = document.getElementById("semester").value;

    if (nameVal === "") {
      msg.textContent = "Error: name cant be blank";
      return;
    }
    if (sem === "" || sem === null) {
      msg.textContent = "Error: please pick a semester";
      return;
    }

    var radios = document.getElementsByName("interest");
    var picked = false;
    for (var j = 0; j < radios.length; j++) {
      if (radios[j].checked) {
        picked = true;
        break;
      }
    }
    if (!picked) {
      msg.textContent = "Pick one of the 5 options for the survey question";
      return;
    }

    msg.className = "form-msg ok";
    msg.textContent = "Thanks " + nameVal + " - form looks good!";
    form.reset();
  });
}

makeGallery();
setupForm();
loadMoragaWeather();
