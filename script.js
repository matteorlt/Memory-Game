$(document).ready(function () {
  // Quand on clique sur le bouton, on démarre la partie
  $(".btn.btn-primary.custom-btn").on("click", function () {
    startGame();
  });
});

// Fonction pour démarrer le jeu
function startGame() {
  console.log("start");
  setupCardClicks();
  maxTwoCards()

  // maxTwoCards();
  // shuffleCards();
}

// Fonction pour gérer les clics sur les cartes
function setupCardClicks() {
  $(".img-cell").on("click", function () {
    if (!$(this).hasClass("clicked")) {
      let randomNumCardsClicks = maxTwoCards()[0];
      let imgListe = [
        "Ball.png",
        "Bands.png",
        "Bars.png",
        "Champi.png",
        "Flower.png",
        "Hearth.png",
        "Leaves.png",
        "Star.png",
        "Waves.png",
        "Yellow_flower.png",
      ];
      $(this)
        .find("img")
        .attr("src", "images/" + imgListe[randomNumCardsClicks]);
      $(this).addClass("clicked");
    }
  });
}

  function maxTwoCards() {
    let randomNum = 0;
    let liste = [];
    let count = {};
  
    for (let i = 0; i < 20; i++) {
      randomNum = Math.floor(Math.random() * 10);
      if (count[randomNum] === undefined) {
        count[randomNum] = 1;
      } else if (count[randomNum] < 2) {
        count[randomNum]++;
      } else {
        i--;
        continue;
      }
      liste.push(randomNum);
    }
  
    return liste;
  }

function twoCardsAreTheSame() {}

function shuffleCards() {}

function cardsPlace() {}
