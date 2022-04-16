let compteur = 1; // initialisation d'un compteur pour attribuer des id uniques
document.querySelector("small").style.display = "none"; // par défaut, on cache le message d'erreur

document.querySelector("form").addEventListener("submit", (e) => {
  // lors de la soumission du formulaire
  e.preventDefault(); // on empêche la page de recharger
  const actionWritten = document.querySelector("#action"); // sélection de l'input
  if (actionWritten.value !== "") {
    // si la valeur de l'input n'est pas vide
    document.querySelector("small").style.display = "none"; // on cache le message d'erreur
    const newItem = document.createElement("li"); // création d'un nouvel élément qui contiendra l'action écrite par l'utilisateur
    newItem.className = "newItem"; // ajout d'une classe pour styler l'élément créé
    newItem.innerHTML = `<input type="checkbox" id="${compteur}" class="form-check"> ${actionWritten.value} <button type="button"><img src="img/close-button.png" alt="close-btn"></button>`;
    // ajout, à l'intérieur de l'élément, d'une checkbox, de l'action saisie par l'utilisateur et d'un bouton
    document.querySelector(".list-todo").appendChild(newItem); // ajout de l'élément créé dans la liste
    const checkBox = newItem.querySelector("input"); // sélection de l'input dans l'élément créé
    checkBox.addEventListener("click", () => {
      // ajout d'un événement sur l'input, celui-ci se produira lors du clic sur l'input
      if (checkBox.checked === true) {
        // au clic, si la checkbox est checked
        newItem.classList.add("done"); // ajout d'une classe qui permet de barrer le texte
      } else {
        newItem.classList.remove("done"); // sinon, on retire cette classe
      }
    });
    const closeBtn = newItem.querySelector("button"); // sélection du bouton
    closeBtn.addEventListener("click", () => {
      // pareil, on ajoute un événement qui se produira lors du clic sur le bouton
      newItem.classList.add("fade"); // l'élément de liste disparaît progressivement
      setTimeout(() => {
        document.querySelector(".list-todo").removeChild(newItem); // l'élément est ensuite supprimé de la liste
      }, 500);
    });
    actionWritten.value = ""; // suppression du texte saisi dans l'input
  } else {
    document.querySelector("small").style.display = "block";
  }
});
