let compteur = 1; // initialisation d'un compteur pour attribuer des id uniques
document.querySelector("small").style.display = "none"; // par défaut, on cache le message d'erreur

document.querySelector("form").addEventListener("submit", (e) => { // ajout d'un événement qui se produira lors de la soumission du formulaire 
    e.preventDefault(); // suppression de l'événement par défaut, qui est de rediriger vers une autre page
    const actionWritten = document.querySelector("#action"); // sélection de l'input 
    if (actionWritten.value !== '') { // si la valeur de l'input n'est pas vide 
        document.querySelector("small").style.display = "none"; // on cache le message d'erreur
        const newItem = document.createElement("li"); // création d'un nouvel élément qui contiendra l'action écrite par l'utilisateur
        newItem.className = "newItem"; // ajout d'une classe pour styler l'élément créé
        newItem.innerHTML = `<input type="checkbox" name="to-do-${compteur}" id="${compteur}" class="form-check"> ${actionWritten.value} <button><img src="img/close_button.png" alt="close-btn"></button>`;
        // ajout, à l'intérieur de l'élément, d'une checkbox, de l'action saisie par l'utilisateur et d'un bouton
        document.querySelector(".list-todo").appendChild(newItem); // ajout de l'élément créé dans la liste
        const checkBox = newItem.querySelector("input"); // sélection de l'input dans l'élément créé
        checkBox.addEventListener("click", () => { // ajout d'un événement sur l'input, celui-ci se produira lors du clic sur l'input
            if (checkBox.checked === true) { // au clic, si la checkbox est checked 
                newItem.classList.add("done"); // ajout d'une classe qui permet de barrer le texte
            } else {
                newItem.classList.remove("done"); // sinon, on retire cette classe 
            }
        })
        const closeBtn = newItem.querySelector("button"); // sélection du bouton
        closeBtn.addEventListener("click", () => { // pareil, on ajoute un événement qui se produira au clic
            document.querySelector(".list-todo").removeChild(newItem); // si l'utilisateur clique sur l'image du bouton, l'élément créé est supprimé du document HTML
        })
        actionWritten.value = ""; // suppression du texte saisi dans l'input
        compteur++; // incrémentation du compteur
    } else {
        document.querySelector("small").style.display = "block";
    }
})

// 