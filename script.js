const btnMenu = document.querySelector("#btnMenu");
const listeNav = document.querySelector("#navBar ul");
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
    if (barreMedia.getAttribute("class") === "active" || barreMedia.getAttribute("class") === "active inactive") {
      signe.setAttribute("class", "fa-solid fa-minus");
    }
  }
});


/* Apparition/disparition de l'overlay sur les box "projet" sur écran de -650px de large + gestion des redirections */

const liens = ["http://annotweet.fr/page_inscription.php", "./projets/projets-html-css/CV.html", "./projets/projets-javascript/le-juste-prix-avec-javascript/index.html"];

projets.forEach((projet) => {
  projet.addEventListener("click", (e) => {
    if (window.matchMedia("(max-width: 650px)").matches) {
      projet.classList.toggle("active");
      if (projet.getAttribute("class") === "projet active") {
        let indexLien = projets.indexOf(e.target.parentElement);
        setTimeout(() => {
          window.open(liens[indexLien], "_blank");
        }, 5000);
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
