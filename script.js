$(document).ready(function () {
  // Quand on clique sur le bouton, on démarre la partie
  $(".btn.btn-primary.custom-btn").on("click", function () {
    startGame();
  });

  // Gestion de la touche "espace" pour relancer le jeu
  $(document).on("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") { // Vérifie si la touche appuyée est Espace
      e.preventDefault();
      restartGame();
    }
  });
});

let cardValues = [];
let flippedCards = [];

// Fonction pour démarrer le jeu
function startGame() {
  console.log("start");
  assignCards();
  setupCardClicks();
}

// Fonction pour relancer le jeu
function restartGame() {
  console.log("Relance de la partie");
  $(".img-cell").removeClass("flipped matched");

  flippedCards = [];
  assignCards();  // Réaffecte les cartes mélangées
  setupCardClicks();
}

// Fonction pour assigner les valeurs des cartes
function assignCards() {
  cardValues = generateShuffledPairs();

  $(".img-cell").each(function (index) {
    $(this).data("card-value", cardValues[index]);
    $(this).find("img").attr("src", "images/Background_cards.png");
    $(this).removeClass("clicked matched");
  });
}

// Fonction pour générer les paires de cartes mélangées
function generateShuffledPairs() {
  let pairs = [];
  for (let i = 0; i < 10; i++) {
    pairs.push(i);
    pairs.push(i);
  }

  // Mélange des cartes
  for (let i = pairs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  return pairs;
}

// Fonction pour gérer les clics sur les cartes
function setupCardClicks() {
  $(".img-cell").off("click").on("click", function () {
    if ($(this).hasClass("flipped") || $(this).hasClass("matched") || flippedCards.length === 2) return;

    const card = $(this);
    const imgIndex = card.data("card-value");
    const imgList = [
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

    // Animation de retournement de carte
    card.addClass("flipped");
    setTimeout(() => {
      card.find(".card-back img").attr("src", "images/" + imgList[imgIndex]);
    }, 200); // L'image se charge après la transition d'animation

    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  });
}

// Fonction pour vérifier si les cartes retournées sont identiques
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const val1 = card1.data("card-value");
  const val2 = card2.data("card-value");

  if (val1 === val2) {
    card1.addClass("matched");
    card2.addClass("matched");
    flippedCards = [];

    if ($(".img-cell.matched").length === 20) {
      setTimeout(() => alert("🎉 Bravo, tu as gagné !"), 500);
    }
  } else {
    setTimeout(() => {
      card1.removeClass("flipped");
      card2.removeClass("flipped");
      flippedCards = [];
    }, 1500); // Réinitialise après un délai
  }
}
