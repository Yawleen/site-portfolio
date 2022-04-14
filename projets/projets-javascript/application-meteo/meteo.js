
function Meteo(ville) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=184c039ff6901b4086337f593bead033&units=metric&lang=fr'; // url de l'api avec le nom de la ville

    let requete = new XMLHttpRequest(); // appel de l'objet XRH pour faire une requête AJAX
    requete.open("GET", url);  // précise qu'on souhaite envoyer des infos dans une URL
    requete.responseType = "json"; // récupération des données au format JSON
    requete.send(); // envoi de la requête

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let response = requete.response; // récupération du résultat de la requête
                document.querySelector("#ville").textContent = response.name; // remplace le contenu de l'élément sélectionné avec le nom de la ville
                document.querySelector("#temperature_label").textContent = Math.round(response.main.temp); // remplace l'élément sélectionné avec la température
                document.querySelector(".img").src = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"; // ajout de la source de l'image
                let iconColors = { "01d": "#EC6E4C", "01n": "#48484a", "02d": "#EC6E4C", "02n": "#48484a", "03d": "#DDDDDD", "03n": "#DDDDDD", "04d": "#48484a", "04n": "#48484a", "09d": "#48484a", "09n": "#48484a", "10d": "#ec6d4c", "10n": "#48484a", "11d": "#49494b", "11n": "#49494b", "13d": "#49494b", "13n": "#49494b", "50d": "#7e7e80", "50n": "#7e7e80" };
                document.querySelector("#changer").style.background = iconColors[response.weather[0].icon]; // adaptation de la couleur du fond de l'élément en fonction de l'icône

                let element = document.querySelector("body"); 
                element.style.background = "linear-gradient(to top, #fff," + iconColors[response.weather[0].icon] + ")"; // ajout d'un fond dégradé en fonction de l'icône
                element.style.backgroundRepeat = "no-repeat";
            } else {
                alert("Un problème est survenu, merci de revenir plus tard.");
            }
        }
    }

}

function MeteoGeo(latitude, longitude) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=184c039ff6901b4086337f593bead033&units=metric&lang=fr'; // url de l'api avec les coordonnées géographiques

    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let response = requete.response;
                document.querySelector("#ville").textContent = response.name;
                document.querySelector("#temperature_label").textContent = Math.round(response.main.temp);
                document.querySelector(".img").src = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
                let iconColors = { "01d": "#EC6E4C", "01n": "#48484a", "02d": "#EC6E4C", "02n": "#48484a", "03d": "#DDDDDD", "03n": "#DDDDDD", "04d": "#48484a", "04n": "#48484a", "09d": "#48484a", "09n": "#48484a", "10d": "#ec6d4c", "10n": "#48484a", "11d": "#49494b", "11n": "#49494b", "13d": "#49494b", "13n": "#49494b", "50d": "#7e7e80", "50n": "#7e7e80" };
                document.querySelector("#changer").style.background = iconColors[response.weather[0].icon];

                let element = document.querySelector("body");
                element.style.background = "linear-gradient(to top, #fff," + iconColors[response.weather[0].icon] + ")";
                element.style.backgroundRepeat = "no-repeat";
            } else {
                alert("Un problème est survenu, merci de revenir plus tard.");
            }
        }
    }
}

function erreur() {
    Meteo("Paris"); // si erreur, la fonction "Meteo" est appelée avec une ville par défaut 
    setInterval(function () { Meteo("Paris"); }, 600000); // toutes les 20mn, la même fonction est rappelée pour actualiser la météo
}


if ("geolocation" in navigator) { // s'il y a la géolocalisation sur le navigateur
    navigator.geolocation.watchPosition((position) => { // choix de la fonction qui va permettre de suivre la position de l'utilisateur et donc va actualiser automatiquement la position 
        MeteoGeo(position.coords.latitude, position.coords.longitude); // appel de la fonction en donnant les coordonnées de l'utilisateur
    }, erreur, options);
} else {
    Meteo("Paris"); // s'il n'y a pas de géolocalisation (ou désactivation), la météo de la ville par défaut sera affichée
    setInterval(function () { Meteo("Paris"); }, 600000); // actualisation de la météo toutes les 20mn
}

var options = {
    enableHighAccuracy: true // géolocalisation avec précision
}


let btn = document.querySelector("#changer");
btn.addEventListener("click", () => { // au clic du bouton, proposer de saisir une ville
    let villeChoisie = prompt("Pour quelle ville souhaitez-vous afficher la météo ?");
    Meteo(villeChoisie); // affichage de la météo pour la ville choisie
    setInterval(function () { Meteo(villeChoisie); }, 600000); // actualisation de la météo de la ville choisie
});


