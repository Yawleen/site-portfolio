window.addEventListener("load", () => {
  alert(
    "Tentez de deviner le juste prix en 10 coups maximum !\n(nombre entre 0 et 100 (0 et 100 inclus*))"
  );
});

let input = document.querySelector("#prix");
let error = document.querySelector("small");
let formulaire = document.querySelector("#formulaire");
let btnSub = document.querySelector("button");
let instructions = document.querySelector("#instructions");
const titre = document.querySelector("h1");

error.style.display = "none";

let nombreAleatoire = Math.floor(Math.random() * 101);
let coups = 0;
let nombreChoisi;

function verifier(nombre) {
  let instruction = document.createElement("div");

  if (nombre < nombreAleatoire) {
    instruction.textContent = "#" + coups + " (" + nombre + ") C'est plus !";
    instruction.className = "instruction plus";
  } else if (nombre > nombreAleatoire) {
    instruction.textContent = "#" + coups + " (" + nombre + ") C'est moins !";
    instruction.className = "instruction moins";
  } else {
    instruction.textContent =
      "#" +
      coups +
      " (" +
      nombre +
      ") Félicitations, vous avez trouvé le juste prix en " +
      coups +
      " coup(s) !";
    instruction.className = "instruction fini";
    input.disabled = "true";
    btnSub.disabled = "true";
    titre.classList.add("active");
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["💰", "💸", "✨"],
      emojiSize: 80,
      confettiNumber: 25,
    });

    jsConfetti.addConfetti().then(
      setTimeout(() => {
        document.location.reload(true);
      }, 9000)
    );
  }

  instructions.prepend(instruction);
}

input.addEventListener("keyup", () => {
  if (isNaN(input.value)) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }
});

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isNaN(input.value) || input.value == "") {
    input.style.border = "1px solid #EF3E36";
  } else {
    coups++;
    input.style.border = "1px solid #757780";
    nombreChoisi = input.value;
    input.value = "";
    if (coups < 10) {
      verifier(nombreChoisi);
    } else if (coups == 10) {
      input.disabled = "true";
      btnSub.disabled = "true";
      verifier(nombreChoisi);
      let info = document.createElement("div");
      info.textContent =
        "C'est terminé, vous avez atteint les 10 coups ! Le juste prix était " +
        nombreAleatoire +
        ".";
      info.className = "instruction last";
      instructions.prepend(info);
      setTimeout(() => {
        document.location.reload(true);
      }, 9000);
    }
  }
});
