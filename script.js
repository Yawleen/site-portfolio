const btnMenu = document.querySelector("#btnMenu");
const listeNav = document.querySelector("#navBar ul");
const listeEl = document.querySelectorAll("#navBar ul li");
const bloc = document.querySelector(".bloc");
const barreMedia = document.querySelector("#media");
const signe = document.querySelector("#media span i");
const sectionProjets = document.querySelector("#projets");
const projets = Array.from(document.querySelectorAll(".projet"));

/* Apparition/disparition du menu sur écran de -650px de large */

btnMenu.addEventListener("click", () => {
  btnMenu.classList.toggle("active");
  listeNav.classList.toggle("active");
  barreMedia.classList.toggle("inactive"); // Lorsque le menu est affiché, la barre des media est inaccessible
  sectionProjets.classList.toggle("inactive"); // " ", la section "projets" est inaccessible
});

/* Ouverture/fermeture de la barre des media sur écran de -650px de large */

barreMedia.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 650px)").matches) {
    barreMedia.classList.toggle("active");
    signe.getAttribute("class") === "fa-solid fa-plus"
      ? signe.setAttribute("class", "fa-solid fa-minus")
      : signe.setAttribute("class", "fa-solid fa-plus");
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 650px)").matches) {
    signe.setAttribute("class", "fa-solid fa-plus");
  } else {
    if (
      barreMedia.getAttribute("class") === "active" ||
      barreMedia.getAttribute("class") === "active inactive"
    ) {
      signe.setAttribute("class", "fa-solid fa-minus");
    }
  }
});

/* Rotation du bloc de la section "accueil" */

setTimeout(() => {
  bloc.classList.add("rotate");
}, 5000);

const elSansEvent = [];

for (let i = 0; i < document.querySelector(".media").children.length; i++) {
  elSansEvent.push(document.querySelector(".media").children[i]);
}

bloc.addEventListener("click", (e) => {
  if (elSansEvent.every((el) => el !== e.target) === true) {
    bloc.classList.toggle("rotate");
  }
});

/* Apparition/disparition de l'overlay sur les box "projet" sur écran de -650px de large + gestion des redirections */

const liens = [
  "http://annotweet.fr/page_inscription.php",
  "./projets/projets-html-css/CV.html",
  "./projets/projets-javascript/le-juste-prix-avec-javascript/index.html",
  "./projets/projets-javascript/application-meteo/application-meteo.html",
  "./projets/projets-javascript/to-do-list/to-do-list.html",
  "./projets/projets-javascript/recherche-github/recherche-github.html",
];

projets.forEach((projet) => {
  projet.addEventListener("click", (e) => {
    if (window.matchMedia("(max-width: 650px)").matches) {
      projet.classList.toggle("active");
      if (projet.getAttribute("class") === "projet active") {
        let indexLien = projets.indexOf(e.target.parentElement);
        const awaitTimeout = (delay) =>
          new Promise((resolve) => setTimeout(resolve, delay));
        awaitTimeout(5000).then(() => window.open(liens[indexLien], "_blank"));
      }
    } else {
      let indexLien = projets.indexOf(e.target.parentElement);
      window.open(liens[indexLien], "_blank");
    }
  });
});

/* Disparition de la barre de navigation sur écran de +650px lorsqu'on arrive à la section "projets" */

window.addEventListener("scroll", () => {
  if (window.matchMedia("(min-width: 650px)").matches) {
    if (
      window.pageXOffset >=
      document.body.scrollWidth - document.body.clientWidth * 2 + 450
    ) {
      listeNav.classList.add("hidden");
    } else {
      listeNav.classList.remove("hidden");
    }
  } else {
    if (listeNav.getAttribute("class") === "hidden") {
      listeNav.classList.remove("hidden");
    }
  }
});

/* Scrollspy */

window.addEventListener("load", () => {
  listeEl[0].classList.add("frame");
});

window.addEventListener("scroll", () => {
  if (window.matchMedia("(min-width: 650px)").matches) {
    if (window.pageXOffset * 2 <= document.body.clientWidth) {
      listeEl[1].getAttribute("class") === "frame"
        ? (listeEl[1].classList.remove("frame"),
          listeEl[0].classList.add("frame"))
        : listeEl[0].classList.add("frame");
    } else if (
      window.pageXOffset * 2 > document.body.clientWidth &&
      window.pageXOffset * 2 < document.body.clientWidth * 2 + 1000
    ) {
      listeEl[0].getAttribute("class") === "frame"
        ? (listeEl[0].classList.remove("frame"),
          listeEl[1].classList.add("frame"))
        : listeEl[1].classList.add("frame");
    } else {
      listeEl[1].classList.remove("frame");
    }
  }
});
