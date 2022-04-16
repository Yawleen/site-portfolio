const APICALL = "https://api.github.com/users/"; // URL de l'API GitHub
const affichage = document.querySelector(".affichage");
const form = document.querySelector(".form-github-recherche");
const inpRecherche = document.querySelector(".inp-recherche");

async function dataGitHub(utilisateur) {
  const reponse = await fetch(`${APICALL}${utilisateur}`); // on fait une requête asynchrone avec fetch pour récupérer les données d'un utilisateur via l'API
  const data = await reponse.json(); // on récupère les données retournées au format JSON, ça retournera donc un objet
  if (data.message !== "Not Found") {
    console.log(data);
    creationCarte(data); // on créé une carte avec les données récupérées
  } else {
    alert("L'utilisateur que vous recherchez n'existe pas.");
  }
}

function creationCarte(user) {
  const carteHTML = `
    <div class="carte">
        <div id="bg-img">
            <img src="${user.avatar_url}" alt="avatar">
            <img src="img/github-cat.png" alt="chat github">
        </div>
        <ul class="cont-infos">
            <li class="username">${user.name}<span>a.k.a ${
    user.login
  }</span></li>
            <li class="followers">${
              user.followers > 1
                ? user.followers + " followers"
                : user.followers + " follower"
            }</li>
            <li class="etoiles">${
              user.public_repos > 1
                ? user.public_repos + " repositories"
                : user.public_repos + " repository"
            }</li>
            <li class="bio">${
              user.bio !== null
                ? "<span>❛</span> " + user.bio + " <span>❜</span>"
                : "Aucune bio disponible"
            }</li>
        </ul>
    </div>
    `; // on va cibler les différentes propriétés de l'objet pour récupérer leur valeur et les afficher dans la carte HTML
  affichage.innerHTML = carteHTML; // on ajoute le contenu HTML créé dans la div qui possède la classe "affichage"
  setTimeout(() => {
    document.querySelector(".carte").classList.add("appear");
  }, 200);
}

form.addEventListener("submit", (e) => {
  // ajout d'un événement "submit" au formulaire
  e.preventDefault(); // on prévient le comportement par défaut

  if (inpRecherche.value !== "") {
    // à la soumission, si l'input n'est pas vide
    dataGitHub(inpRecherche.value); // on va récupérer les données de l'utilisateur saisi et rechercher l'utilisateur
    inpRecherche.value = ""; // on efface automatiquement ce qui a été saisi pour permettre une nouvelle recherche
  }
});
