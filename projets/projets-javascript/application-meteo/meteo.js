function Meteo(ville) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    ville +
    "&appid=4a59e6d50eca55c027c4a034b3551c33&units=metric&lang=fr"; // url de l'api avec le nom de la ville

  let requete = new XMLHttpRequest(); // appel de l'objet XRH pour faire une requête AJAX
  requete.open("GET", url);
  requete.responseType = "json"; // récupération des données au format JSON
  requete.send(); // envoi de la requête

  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let response = requete.response; // récupération du résultat de la requête
        document.querySelector("#ville").textContent = response.name; // remplace le contenu de l'élément sélectionné avec le nom de la ville
        document.querySelector("#temperature_label").textContent = Math.round(
          response.main.temp
        ); // remplace l'élément sélectionné avec la température
        document.querySelector(".img").src =
          "https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png"; // ajout de la source de l'image
        let iconColors = {
          "01d": "#EC6E4C",
          "01n": "#48484a",
          "02d": "#EC6E4C",
          "02n": "#48484a",
          "03d": "#DDDDDD",
          "03n": "#DDDDDD",
          "04d": "#48484a",
          "04n": "#48484a",
          "09d": "#48484a",
          "09n": "#48484a",
          "10d": "#ec6d4c",
          "10n": "#48484a",
          "11d": "#49494b",
          "11n": "#49494b",
          "13d": "#49494b",
          "13n": "#49494b",
          "50d": "#7e7e80",
          "50n": "#7e7e80",
        };
        document.querySelector("#changer").style.backgroundColor =
          iconColors[response.weather[0].icon]; // changement de la couleur de fond du bouton

        document.body.style.backgroundColor =
          iconColors[response.weather[0].icon]; // changement de la couleur de fond du body
      } else {
        alert("Un problème est survenu, merci de revenir plus tard.");
      }
    }
  };
}

function MeteoGeo(latitude, longitude) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=4a59e6d50eca55c027c4a034b3551c33&units=metric&lang=fr"; // url de l'api avec les coordonnées géographiques

  let requete = new XMLHttpRequest();
  requete.open("GET", url);
  requete.responseType = "json";
  requete.send();

  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let response = requete.response;
        document.querySelector("#ville").textContent = response.name;
        document.querySelector("#temperature_label").textContent = Math.round(
          response.main.temp
        );
        document.querySelector(".img").src =
          "https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png";
        let iconColors = {
          "01d": "#EC6E4C",
          "01n": "#48484a",
          "02d": "#EC6E4C",
          "02n": "#48484a",
          "03d": "#DDDDDD",
          "03n": "#DDDDDD",
          "04d": "#48484a",
          "04n": "#48484a",
          "09d": "#48484a",
          "09n": "#48484a",
          "10d": "#ec6d4c",
          "10n": "#48484a",
          "11d": "#49494b",
          "11n": "#49494b",
          "13d": "#49494b",
          "13n": "#49494b",
          "50d": "#7e7e80",
          "50n": "#7e7e80",
        };
        document.querySelector("#changer").style.backgroundColor =
          iconColors[response.weather[0].icon];

        document.body.style.backgroundColor =
          iconColors[response.weather[0].icon];
      } else {
        alert("Un problème est survenu, merci de revenir plus tard.");
      }
    }
  };
}

function erreur() {
  Meteo("Paris"); // si erreur, la fonction "Meteo" est appelée avec une ville par défaut
}

if ("geolocation" in navigator) {
  // s'il y a la géolocalisation dans le navigateur
  navigator.geolocation.watchPosition(
    (position) => {
      // choix de la fonction qui va permettre de suivre la position de l'utilisateur et donc va actualiser automatiquement la position
      MeteoGeo(position.coords.latitude, position.coords.longitude); // appel de la fonction en donnant les coordonnées de l'utilisateur
    },
    erreur,
    options
  );
} else {
  Meteo("Paris"); // s'il n'y a pas de géolocalisation (ou désactivation), la météo de la ville par défaut sera affichée
}

var options = {
  enableHighAccuracy: true, // géolocalisation avec précision
};

let btn = document.querySelector("#changer");
btn.addEventListener("click", () => {
  // au clic du bouton, proposer de saisir une ville
  let villeChoisie = prompt(
    "Pour quelle ville souhaitez-vous afficher la météo ?"
  );
  Meteo(villeChoisie); // affichage de la météo pour la ville choisie
});
