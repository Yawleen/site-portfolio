const contCouleurs = document.querySelector(".container-couleurs");
let inputsCouleur = document.querySelectorAll(".inp-couleur");
let cerclesCouleur = document.querySelectorAll(".cercle-couleur");
const contCSS = document.querySelector(".container-code-css");
const btnClose = document.querySelector(".close");
const btnPaste = document.querySelector(".paste");
const comment = document.querySelector(".comment");
const prop = document.querySelector(".prop");
const ponct = document.querySelector(".ponct");
const val = document.querySelector(".val");
const inputRange = document.querySelector(".inp-range");
const btnPlus = document.querySelector(".plus");
const btnsRandom1 = document.querySelectorAll(".inp-group .random");
const btnRandom2 = document.querySelector(".container-btn .random");
const btnCssCode = document.querySelector(".code-css");

// Init

let valCouleurs = { 1: "#B06817", 2: "#EDDB93" };
let index = 3;
let inclinaison = 0;

inputsCouleur[0].value = valCouleurs[1];
inputsCouleur[1].value = valCouleurs[2];
cerclesCouleur[0].style.background = valCouleurs[1];
cerclesCouleur[1].style.background = valCouleurs[2];

document.body.style.background = `linear-gradient(${inclinaison}deg, ${Object.values(
  valCouleurs
)})`;

comment.textContent = "/* Dégradé linéaire */";
prop.textContent = "background";
ponct.textContent = ": ";
val.innerHTML = `<span class="linear">linear-gradient</span>(${inclinaison}deg, ${Object.values(
  valCouleurs
)});`;

inputsCouleur.forEach((input) => {
  input.addEventListener("input", (e) => {
    ajout_ModifCouleur(e);
  });
});

// Fonctions

function verifNbCouleurs() {
  if (Object.keys(valCouleurs).length > 1) {
    document.body.style.background = `linear-gradient(${inclinaison}deg, ${Object.values(
      valCouleurs
    )})`;
    comment.textContent = "/* Dégradé linéaire */";
    prop.textContent = "background";
    ponct.textContent = ": ";
    val.innerHTML = `<span class="linear">linear-gradient</span>(${inclinaison}deg, ${Object.values(
      valCouleurs
    )});`;
  } else {
    document.body.style.background = "#333";
    comment.textContent =
      "/* Il faut au moins deux couleurs pour générer un dégradé linéaire et son code CSS. */";
    prop.textContent = "";
    ponct.textContent = "";
    val.innerHTML = "";
  }
}

function suppCouleur(input) {
  if (
    Object.keys(valCouleurs).includes(input.getAttribute("data-index")) &&
    Object.keys(valCouleurs).length < 3
  ) {
    delete valCouleurs[input.getAttribute("data-index")];
    document.body.style.background = "#333";
    comment.textContent =
      "/* Il faut au moins deux couleurs pour générer un dégradé linéaire et son code CSS. */";
    prop.textContent = "";
    ponct.textContent = "";
    val.innerHTML = "";
  } else if (
    Object.keys(valCouleurs).includes(input.getAttribute("data-index")) &&
    Object.keys(valCouleurs).length > 2
  ) {
    delete valCouleurs[input.getAttribute("data-index")];
    document.body.style.background = `linear-gradient(${inclinaison}deg, ${Object.values(
      valCouleurs
    )})`;
    comment.textContent = "/* Dégradé linéaire */";
    prop.textContent = "background";
    ponct.textContent = ": ";
    val.innerHTML = `<span class="linear">linear-gradient</span>(${inclinaison}deg, ${Object.values(
      valCouleurs
    )});`;
  }
}

function ajout_ModifCouleur(event) {
  if (/#[a-fA-F0-9]{6}/.test(event.target.value)) {
    event.target.previousElementSibling.style.background = event.target.value;
    valCouleurs[event.target.getAttribute("data-index")] = event.target.value;
    verifNbCouleurs();
  } else {
    event.target.previousElementSibling.style.background = "#fff";
    suppCouleur(event.target);
  }
}

function suppInput(event) {
  suppCouleur(event.target.parentNode.children[1]);
  contCouleurs.removeChild(event.target.parentNode);
  index--;
}

function randomCouleurs() {
  inputsCouleur = document.querySelectorAll(".inp-couleur");
  cerclesCouleur = document.querySelectorAll(".cercle-couleur");
  valCouleurs = {};
  const lettresChiffres = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];

  for (let i = 0; i < inputsCouleur.length; i++) {
    let randomCouleur = "#";
    for (let i = 0; i < 6; i++) {
      randomCouleur += lettresChiffres[Math.floor(Math.random() * 16)];
    }
    cerclesCouleur[i].style.background = randomCouleur;
    inputsCouleur[i].value = randomCouleur;
    valCouleurs[inputsCouleur[i].getAttribute("data-index")] = randomCouleur;
  }

  verifNbCouleurs();
}

function randomCouleur(event) {
  const siblingNodes = event.target.parentNode.children;
  const lettresChiffres = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];

  let randomCouleur = "#";
  for (let i = 0; i < 6; i++) {
    randomCouleur += lettresChiffres[Math.floor(Math.random() * 16)];
  }

  siblingNodes[0].style.background = randomCouleur;
  siblingNodes[1].value = randomCouleur;
  valCouleurs[siblingNodes[1].getAttribute("data-index")] = randomCouleur;

  verifNbCouleurs();
}

// Inclinaison

inputRange.addEventListener("input", (e) => {
  inclinaison = (e.target.value * 3.6).toFixed();
  verifNbCouleurs();
});

// Bouton code CSS + bouton close

[btnCssCode, btnClose].forEach((btn) => {
  btn.addEventListener("click", () => {
    contCSS.classList.toggle("active");
  });
});

// Bouton plus

btnPlus.addEventListener("click", () => {
  const inpGroup = document.createElement("div");
  inpGroup.setAttribute("class", "inp-group");
  inpGroup.innerHTML = `
    <div class="cercle-couleur"></div>
    <input type="text" data-index="${index}" maxlength="7" class="inp-couleur">
    <button class="moins">
    <svg xmlns="http://www.w3.org/2000/svg" fill="#222" width="28" height="28" class="bi bi-x"
        viewBox="0 0 16 16">
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
    </svg>
</button>
    <button type="button" class="random">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#222" width="18" height="18"
            viewBox="0 0 320 512">
            <path
                d="M204.3 32.01H96c-52.94 0-96 43.06-96 96c0 17.67 14.31 31.1 32 31.1s32-14.32 32-31.1c0-17.64 14.34-32 32-32h108.3C232.8 96.01 256 119.2 256 147.8c0 19.72-10.97 37.47-30.5 47.33L127.8 252.4C117.1 258.2 112 268.7 112 280v40c0 17.67 14.31 31.99 32 31.99s32-14.32 32-31.99V298.3L256 251.3c39.47-19.75 64-59.42 64-103.5C320 83.95 268.1 32.01 204.3 32.01zM144 400c-22.09 0-40 17.91-40 40s17.91 39.1 40 39.1s40-17.9 40-39.1S166.1 400 144 400z" />
        </svg>
    </button>`;
  contCouleurs.appendChild(inpGroup);
  inpGroup.querySelector("input").addEventListener("input", (e) => {
    ajout_ModifCouleur(e);
  });
  inpGroup.querySelector(".moins").addEventListener("click", (e) => {
    suppInput(e);
  });
  inpGroup.querySelector(".random").addEventListener("click", (e) => {
    randomCouleur(e);
  });

  index++;
});

// Bouton copier

btnPaste.addEventListener("click", (e) => {
  if (document.querySelector(".css").textContent !== "") {
    navigator.clipboard
      .writeText(document.querySelector(".css").textContent)
      .then(() => {
        e.target.firstElementChild.innerHTML =
          '<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>';
        setTimeout(() => {
          e.target.firstElementChild.innerHTML =
            '<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>';
        }, 1000);
      })
      .catch(() => {
        e.target.firstElementChild.innerHTML =
          '<path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>';
        setTimeout(() => {
          e.target.firstElementChild.innerHTML =
            '<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>';
        }, 1000);
      });
  } else {
    e.target.firstElementChild.innerHTML =
      '<path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>';
    setTimeout(() => {
      e.target.firstElementChild.innerHTML =
        '<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>';
    }, 1000);
  }
});

// Boutons random pour changer la valeur d'un seul input

btnsRandom1.forEach((btnRandom) =>
  btnRandom.addEventListener("click", (e) => {
    randomCouleur(e);
  })
);

// Bouton random pour changer la valeur de tous les inputs

btnRandom2.addEventListener("click", randomCouleurs);
