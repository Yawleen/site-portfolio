const upload = document.querySelector("#upload");
const contImg = document.querySelector(".container-img");
const btnRandom = document.querySelector("#random");
const btnAjust = document.querySelector("#ajustement");
const btnRemplir = document.querySelector("#remplissage");
const btnRotate = document.querySelector(".rotate");
const btnSupp = document.querySelector("#supprimer");
const btnReset = document.querySelector("#reset");
const btnPaste = document.querySelector(".paste");
const inputsRange = Array.from(
  document.querySelectorAll('.options input[type="range"]')
);


// Init

[...inputsRange, btnAjust, btnRemplir, btnRotate, btnReset, btnSupp].forEach(
  (input) => (input.disabled = true) // au début, tous les inputs/boutons permettant d'ajouter du style à l'image sont désactivés
);

let rotation = 0; // on initialise une variable "rotation" pour appliquer une rotation à l'image 
let filters = {}; // on crée un objet vide pour stocker les filtres

// Fonctions

function afficherImg(url) { 
  upload.parentNode.style.display = "none"; // le container "area" et son input file disparaîssent
  btnRandom.style.display = "none"; // le bouton random aussi
  contImg.style.display = "flex"; // le container à image apparaît
  const img = document.createElement("img"); // un élément image est créé
  img.src = url; // à partir d'une url renseignée en entrée
  contImg.appendChild(img); // l'image est ensuite ajoutée dans le container à image
  [...inputsRange, btnAjust, btnRemplir, btnRotate, btnReset, btnSupp].forEach(
    (input) => (input.disabled = false) // les inputs/boutons qui permettent de styliser l'image sont alors activés
  );
}

function ajoutFiltre(event) {
  filters[event.target.getAttribute("id")] = [
    `${event.target.getAttribute("id")}(${event.target.value}%)`,
    event.target.value,
  ]; // dans l'objet "filters", on ajoute une propriété qui correspond au nom du filtre et on lui donne en valeur un tableau contenant le filtre CSS avec la valeur de l'input puis la valeur de l'input  
  contImg.children[0].style.filter = Object.values(filters) // on applique tous les filtres ajoutés à l'image
    .map((filter) => filter[0])
    .join(" ");
  document.querySelector(".comment.filtres").textContent = "/* Filtres */"; 
  document.querySelector(".css.filtres").innerHTML = `
      <span class="prop">filter</span><span class="ponct">: </span><span class="val">${Object.entries(
        filters
      ) // le CSS correspondant est affiché
        .map((keyVal) => {
          return `<span class="func">${keyVal[0]}</span>(${keyVal[1][1]}%)`;
        })
        .join(" ")};</span><br><br>
     `;
}

function suppressionFiltre(event) {
  delete filters[event.target.getAttribute("id")]; // le filtre est supprimé de l'objet
  if (Object.keys(filters).length === 0) { // s'il n'y a plus de filtre dans l'objet
    contImg.children[0].style.filter = "none"; // on enlève le filtre restant de l'image
    document.querySelector(".comment.filtres").textContent = ""; 
    document.querySelector(".css.filtres").innerHTML = ""; // on supprime le CSS
  } else {
    contImg.children[0].style.filter = Object.values(filters) // sinon, s'il y a encore un/des filtre(s) dans l'objet, on applique le/les filtre(s) restant(s) à l'image
      .map((filter) => filter[0])
      .join(" ");
    document.querySelector(".css.filtres").innerHTML = `
          <span class="prop">filter</span><span class="ponct">: </span><span class="val">${Object.entries(
            filters
          ) // le CSS correspondant est affiché
            .map((keyVal) => {
              return `<span class="func">${keyVal[0]}</span>(${keyVal[1][1]}%)`;
            })
            .join(" ")};</span><br><br>
         `;
  }
}

function redimensionnerImg(prop) {
  contImg.children[0].style.objectFit = prop; // on redimensionne l'image avec la propriété renseignée en entrée
  contImg.children[0].style.width = "100%"; // l'image occupe tout l'espace du container à image
  contImg.children[0].style.height = "100%"; 
  document.querySelector(".comment.cadrage").textContent = "/* Cadrage */";
  document.querySelector(".css.cadrage").innerHTML = `
      <span class="prop">object-fit</span><span class="ponct">: </span><span class="val"><span class="keyword">${prop}</span>;</span><br>
      <span class="prop">width</span><span class="ponct">: </span><span class="val"><span class="taille">100%</span>;</span><br>
      <span class="prop">height</span><span class="ponct">: </span><span class="val"><span class="taille">100%</span>;</span><br><br>`; // le CSS correspondant est affiché
}

function reinitialiser() { 
  rotation = 0; // la variable "rotation" est remise à 0
  filters = {}; // l'objet "filters" est vidé
  // tous les inputs reprennent leur valeur initiale
  inputsFiltres1.forEach((input) => { 
    input.value = 100; // 100 pour les 3 premiers
  });
  inputsRange.slice(3).forEach((input) => { 
    input.value = 0; // 0 pour les 3 suivants
  });
  document
    .querySelectorAll(".comment")
    .forEach((spanComment) => (spanComment.textContent = ""));
  document
    .querySelectorAll(".css") // le CSS est supprimé
    .forEach((spanCss) => (spanCss.innerHTML = ""));
}

// Input upload

upload.addEventListener("dragenter", (e) => {
  upload.parentNode.className = "area dragging";
});

upload.addEventListener("dragleave", (e) => {
  upload.parentNode.className = "area";
});

upload.addEventListener("change", (e) => { // dès que l'input file reçoit un fichier
  upload.parentNode.className = "area dragging"; 
  const file = upload.files[0]; // on récupère ce fichier
  const reader = new FileReader(); // qui va être lu grâce à une instance de FileReader 

  reader.onload = (e) => { 
    afficherImg(e.target.result); // lorsque le fichier aura été lu, l'URL représentant les données du fichier sera utilisée pour afficher l'image 
  };

  reader.readAsDataURL(file); 
});

// Inputs range

const inputsFiltres1 = inputsRange.slice(0, 3); // inputs qui ont une valeur initiale de 100
const inputsFiltres2 = inputsRange.slice(3, 6); // inputs qui ont une valeur initiale de 0

inputsFiltres1.forEach((input) => // pour les inputs qui ont une valeur initiale de 100
  input.addEventListener("input", (e) => { // dès que l'utilisateur va modifier leur valeur
    if (e.target.value < 100) { // si la valeur est strictement inférieure à 100 (donc différente de 100)
      ajoutFiltre(e); // le filtre est ajouté
    } else {
      suppressionFiltre(e); // sinon le filtre est supprimé
    }
  })
);

inputsFiltres2.forEach((input) => // pour les inputs qui ont une valeur initiale de 0
  input.addEventListener("input", (e) => { // dès que l'utilisateur va modifier leur valeur
    if (e.target.value > 0) { // si la valeur est strictement supérieure à 0 (donc différente de 0)
      ajoutFiltre(e); // le filtre est ajouté
    } else {
      suppressionFiltre(e); // sinon le filtre est supprimé
    }
  })
);

inputsRange[6].addEventListener("input", (e) => { // dès que l'input permettant de modifier l'arrondissement des bordures change de valeur
  if (e.target.value > 0) { // on vérifie que sa valeur soit strictement supérieure à 0
    contImg.children[0].style.borderRadius = `${e.target.value}%`; // si c'est le cas, on modifie le style des bordures de l'image avec la valeur choisie
    document.querySelector(".comment.radius").textContent =
      "/* Arrondissement des bordures */";
    document.querySelector(".css.radius").innerHTML = `
        <span class="prop">border-radius</span><span class="ponct">: </span><span class="val"><span class="taille">${e.target.value}%</span>;</span>
       `; // le CSS correspondant est affiché
  } else { // dans le cas où la valeur est 0
    contImg.children[0].style.borderRadius = "initial"; // les bordures de l'image retrouvent leur aspect initial
    document.querySelector(".comment.radius").textContent = "";
    document.querySelector(".css.radius").innerHTML = ""; // le CSS est supprimé
  }
});

// Boutons

btnRandom.addEventListener("click", () => { // dès qu'on clique sur le bouton random
  fetch("https://picsum.photos/500/500?random").then((data) => { // une requête HTTP est effectuée pour récupérer une image aléatoire sur picsum
    afficherImg(data.url); // cette image est affichée
  });
});

btnAjust.addEventListener("click", () => { // dès qu'on clique sur le bouton ajuster
  redimensionnerImg("contain"); // l'image est redimensionnée en utilisant la propriété "contain"
});

btnRemplir.addEventListener("click", () => { // dès qu'on clique sur le bouton remplir
  redimensionnerImg("cover"); // l'image est redimensionnée en utilisant la propriété "cover"
});

btnRotate.addEventListener("click", () => { // dès qu'on clique sur le bouton pour retourner l'image
  rotation += 90; // on ajoute 90 à la variable "rotation"
  if (rotation === 360) { // si ça fait 360
    rotation = 0; // on remet la variable "rotation" à 0
    contImg.children[0].style.transform = "none"; // on enlève la transformation de l'image
    document.querySelector(".comment.rotation").textContent = ""; // le CSS est supprimé
    document.querySelector(".css.rotation").innerHTML = "";
  } else { // si l'image n'a pas effectué de tour complet (donc rotation différente de 360)
    contImg.children[0].style.transform = `rotate(${rotation}deg)`; // on transforme l'image avec la rotation correspondante
    document.querySelector(".comment.rotation").textContent = "/* Rotation */";
    document.querySelector(".css.rotation").innerHTML = `
        <span class="prop">transform</span><span class="ponct">: </span><span class="val"><span class="func">rotate</span>(${rotation}deg);</span><br><br>`;
  } // le CSS correspondant est affiché
});


btnReset.addEventListener("click", () => { // dès qu'on clique sur le bouton reset, tout est réinitialisé : toutes les propriétés appliquées à l'image reprennent leur valeur par défaut 
  contImg.children[0].style.objectFit = "none"; 
  contImg.children[0].style.width = "initial";
  contImg.children[0].style.height = "initial";
  contImg.children[0].style.transform = "none";
  contImg.children[0].style.filter = "none";
  contImg.children[0].style.borderRadius = "initial";
  reinitialiser(); 
});

btnSupp.addEventListener("click", () => { // au clic sur le bouton supprimer
  contImg.removeChild(contImg.children[0]); // l'image est supprimée du container à image
  contImg.style.display = "none"; // le container disparaît
  upload.parentNode.style.display = "block"; // le container "area" et l'input file apparaissent
  btnRandom.style.display = "block"; // de même que le bouton random
  upload.parentNode.className = "area";
  reinitialiser();
  [...inputsRange, btnAjust, btnRemplir, btnRotate, btnReset, btnSupp].forEach(
    (input) => (input.disabled = true) // les inputs/boutons sont désactivés
  );
});

btnPaste.addEventListener("click", (e) => {
  if ( // s'il y a au moins un span rempli de code CSS
    Array.from(document.querySelectorAll(".css")).some(
      (spanCss) => spanCss.textContent !== ""
    )
  ) {
    let contenu = "";
    document.querySelectorAll(".css").forEach((spanCss) => {
      contenu += spanCss.textContent; // le contenu des span CSS est récupéré et concaténé dans une variable "contenu" 
    });
    navigator.clipboard
      .writeText(contenu) // ce contenu est ensuite copié dans le presse-papier
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
