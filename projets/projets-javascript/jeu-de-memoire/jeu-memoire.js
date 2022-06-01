const container = document.querySelector(".container");
const buttonRestart = document.querySelector("button");
const allCards = Array.from(document.querySelectorAll(".card"));
let firstCard = {};
let secondCard = {};

allCards.forEach((card) => {
  let randomPos = Math.floor(Math.random() * 16);
  card.style.order = randomPos;
  card.addEventListener("click", (e) => {
    if (Object.keys(firstCard).length === 0) {
      e.target.classList.toggle("flipped");
      firstCard["name"] = e.target.lastElementChild.dataset["name"];
      firstCard["index"] = allCards.indexOf(e.target);
    } else if (Object.keys(secondCard).length === 0) {
      e.target.classList.toggle("flipped");
      secondCard["name"] = e.target.lastElementChild.dataset["name"];
      secondCard["index"] = allCards.indexOf(e.target);
      checkSimilarity(e);
    }
  });
});

function checkSimilarity(event) {
  if (firstCard["name"] === secondCard["name"]) {
    setTimeout(() => {
      allCards[firstCard["index"]].classList.add("disappear");
      event.target.classList.add("disappear");
      firstCard = {};
      secondCard = {};
      checkEnd();
    }, 700);
  } else {
    setTimeout(() => {
      allCards[firstCard["index"]].classList.toggle("flipped");
      event.target.classList.toggle("flipped");
      firstCard = {};
      secondCard = {};
    }, 1000);
  }
}

function checkEnd() {
  if (
    allCards.every(
      (card) => card.getAttribute("class") === "card flipped disappear"
    )
  ) {
    alert("Partie terminée !");
    buttonRestart.style.display = "block";
  }
}

buttonRestart.addEventListener("click", () => {
  buttonRestart.style.display = "none";
  allCards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
    card.setAttribute("class", "card");
  });
});
