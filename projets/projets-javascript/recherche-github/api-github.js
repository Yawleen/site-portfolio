const APICALL = "https://api.github.com/users/"; // URL de l'API GitHub
const affichage = document.querySelector(".affichage"); 
const form = document.querySelector(".form-github-recherche");
const inpRecherche = document.querySelector(".inp-recherche");

async function dataGitHub(utilisateur) {
    const reponse = await fetch(`${APICALL}${utilisateur}`); // on fait une requête asynchrone avec fetch pour récupérer les données d'un utilisateur via l'API
    const data = await reponse.json(); // on récupère les données retournées au format JSON, ça retournera donc un objet
    if(data.message !== "Not Found") {
        creationCarte(data); // on créé une carte avec les données récupérées
    } else {
        alert("L'utilisateur que vous recherchez n'existe pas.");
    }
    
}

function creationCarte(user) { 
    const carteHTML = `
    <div class="carte">
        <span id="bg"></span>
        <img src="${user.avatar_url}" alt="icone avatar" class="avatar">
        <ul class="cont-infos">
            <li class="username">${user.name}</li>
            <li class="followers">Followers : ${user.followers}</li>
            <li class="etoiles">Repos : ${user.public_repos}</li>
            <li class="bio">Bio : ${user.bio !== null ? user.bio : "Pas de bio disponible"}</li>
        </ul>
    </div>
    `; // on va cibler les différentes propriétés de l'objet pour récupérer leur valeur et les afficher dans la carte HTML
    affichage.innerHTML = carteHTML; // on ajoute le contenu HTML créé dans la div qui possède la classe "affichage"
}

form.addEventListener("submit", (e) => { // ajout d'un événement "submit" au formulaire
    e.preventDefault(); // on prévient le comportement par défaut 

    if(inpRecherche.value !== "") { // à la soumission, si l'input n'est pas vide
       dataGitHub(inpRecherche.value); // on va récupérer les données de l'utilisateur saisi et rechercher l'utilisateur
       inpRecherche.value = "";  // on efface automatiquement ce qui a été saisi pour permettre une nouvelle recherche
    }
    
})
