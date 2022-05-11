const btnMenu = document.querySelector("#btnMenu");
const listeNav = document.querySelector("#navBar ul");
const listeEl = document.querySelectorAll("#navBar ul li");
const bloc = document.querySelector(".bloc");
const barreMedia = document.querySelector("#media");
const svgSigne = document.querySelector("#media span svg");
const sectionProjets = document.querySelector("#projets");
const aHref = Array.from(document.querySelectorAll("#galerie a"));
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
    svgSigne.getAttribute("class") === "plus"
      ? ((svgSigne.innerHTML =
          '<path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"/>'),
        svgSigne.setAttribute("class", "minus"))
      : ((svgSigne.innerHTML =
          '<path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>'),
        svgSigne.setAttribute("class", "plus"));
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 650px)").matches) {
    (svgSigne.innerHTML =
      '<path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>'),
      svgSigne.setAttribute("class", "plus");
  } else {
    if (
      barreMedia.getAttribute("class") === "active" ||
      barreMedia.getAttribute("class") === "active inactive"
    ) {
      (svgSigne.innerHTML =
        '<path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"/>'),
        svgSigne.setAttribute("class", "minus");
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
  "./projets/projets-javascript/generateur-linear-gradient-css/linear-gradient-app.html"
];

if (window.matchMedia("(max-width: 650px)").matches) {
  aHref.forEach((a) => {
    a.removeAttribute("href");
    a.removeAttribute("target");
  });
}

window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 650px)").matches) {
    aHref.forEach((a) => {
      a.removeAttribute("href");
      a.removeAttribute("target");
    });
  } else {
    aHref.forEach((a, i) => {
      a.href = liens[i];
      a.target = "_blank";
    });
  }
});

projets.forEach((projet) => {
  projet.addEventListener("click", (e) => {
    if (window.matchMedia("(max-width: 650px)").matches) {
      projet.classList.toggle("active");
      if (projet.getAttribute("class") === "projet active") {
        if (e.target.parentElement.getAttribute("class") == "projet active") {
          let indexLien = projets.indexOf(e.target.parentElement);
          setTimeout(() => {
            let reponse = confirm(
              `Souhaitez-vous être redirigé(e) vers le projet "${
                e.target.querySelector("h5").textContent
              }" ?`
            );
            if (reponse === true) {
              window.location.href = liens[indexLien];
            }
          }, 3500);
        } else if (e.target.getAttribute("class") == "projet active") {
          let indexLien = projets.indexOf(e.target);
          setTimeout(() => {
            let reponse = confirm(
              `Souhaitez-vous être redirigé(e) vers le projet "${
                e.target.querySelector(".description h5").textContent
              }" ?`
            );
            if (reponse === true) {
              window.location.href = liens[indexLien];
            }
          }, 3500);
        }
      }
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
