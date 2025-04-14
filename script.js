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

  // maxTwoCards();
  // shuffleCards();
}

// Fonction pour gérer les clics sur les cartes
function setupCardClicks() {
    $(".img-cell").on("click", function () {
      if (!$(this).hasClass("clicked")) {
        let randomNum = Math.floor(Math.random() * 10);
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
          .attr("src", "images/" + imgListe[randomNum]);
        $(this).addClass("clicked");
      }
    });
  }

function maxTwoCards() {}

function twoCardsAreTheSame() {}

function shuffleCards() {}

function cardsPlace() {}
