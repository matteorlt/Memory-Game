$(document).ready(function () {
  // Lorsque l'utilisateur clique sur le bouton de démarrage du jeu
  $(".btn.btn-primary.custom-btn").on("click", function () {
    const selectedSize = $("#grid-size").val();
    const [rows, cols] = selectedSize.split("x").map(Number);
    startGame(rows, cols);
  });

  // Lorsque l'utilisateur appuie sur la barre d'espace, démarre le jeu
  $(document).on("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      const selectedSize = $("#grid-size").val();
      const [rows, cols] = selectedSize.split("x").map(Number);
      startGame(rows, cols);
    }
  });
});

<<<<<<< HEAD
let cardValues = [];
let flippedCards = [];
let countscore = 0;
let currentTheme = "principal";
const principal = [
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
  "apple.png",
  "Banana.png",
  "broco.png",
  "cerise.png",
  "Fraise.png",
  "piment.png",
];
const dinosaures = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
];
const animaux = [
  "ane.jpg",
  "belier.jpg",
  "brebis.jpg",
  "bull.jpg",
  "canard.jpg",
  "chat.jpg",
  "coq.jpg",
  "dinde.jpg",
  "dindon.jpg",
  "mouton.jpg",
];
const scoreTableBody = document.querySelector("#score-table tbody");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
=======
let cardValues = [];  // Valeurs des cartes à jouer
let flippedCards = [];  // Cartes retournées actuellement
let countscore = 0;  // Compteur de score
let currentTheme = "principal";  // Thème actuel des cartes
const scoreTableBody = document.querySelector("#score-table tbody");  // Référence au tableau des scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];  // Récupère les scores sauvegardés dans localStorage
>>>>>>> f6dfb109331f7c0ec3998889437a43bd112d16e6

// Thèmes d'images disponibles pour les cartes
const principal = [
  "Ball.png", "Bands.png", "Bars.png", "Champi.png", "Flower.png", "Hearth.png", 
  "Leaves.png", "Star.png", "Waves.png", "Yellow_flower.png", "apple.png", 
  "Banana.png", "broco.png", "cerise.png", "Fraise.png", "piment.png",
];
const dinosaures = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
];
const animaux = [
  "ane.jpg", "belier.jpg", "brebis.jpg", "bull.jpg", "canard.jpg", "chat.jpg", 
  "coq.jpg", "dinde.jpg", "dindon.jpg", "mouton.jpg",
];

// Affiche les meilleurs scores dans le tableau
if (scoreTableBody) {
  highScores.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}</td>
      <td>${entry.gridSize}</td>
      <td>${entry.type}</td>
      <td>${entry.date}</td>
    `;
    scoreTableBody.appendChild(row);
  });
}

<<<<<<< HEAD
=======
/**
 * Fonction pour démarrer le jeu avec une grille de la taille spécifiée.
 * @param {number} rows - Nombre de lignes de la grille.
 * @param {number} cols - Nombre de colonnes de la grille.
 */
>>>>>>> f6dfb109331f7c0ec3998889437a43bd112d16e6
function startGame(rows, cols) {
  countscore = 0;
  $("#score").text("Score : 0");

  const totalCards = rows * cols;
<<<<<<< HEAD
  if (totalCards / 2 > principal.length) {
    alert("Pas assez d’images pour cette taille de grille !");
    return;
  }
  currentTheme = $("#image-theme").val();
  let images;
  if (currentTheme === "principal") {
    images = principal;
  } else if (currentTheme === "dinosaures") {
    images = dinosaures;
  } else if (currentTheme === "animaux") {
    images = animaux;
  } else {
    images = principal; // Par défaut
  }

  if (totalCards / 2 > images.length) {
=======
  // Vérifie si le nombre de cartes nécessaires est disponible pour la taille de la grille
  if (totalCards / 2 > principal.length) {
>>>>>>> f6dfb109331f7c0ec3998889437a43bd112d16e6
    alert("Pas assez d’images pour cette taille de grille !");
    return;
  }

<<<<<<< HEAD
=======
  currentTheme = $("#image-theme").val();
  let images;

  // Détermine les images à utiliser en fonction du thème
  if (currentTheme === "principal") {
    images = principal;
  } else if (currentTheme === "dinosaures") {
    images = dinosaures;
  } else if (currentTheme === "animaux") {
    images = animaux;
  } else {
    images = principal;  // Par défaut
  }

  // Vérifie si le nombre d'images est suffisant pour la grille
  if (totalCards / 2 > images.length) {
    alert("Pas assez d’images pour cette taille de grille !");
    return;
  }

  // Sélectionne un sous-ensemble d'images, puis mélange les cartes
>>>>>>> f6dfb109331f7c0ec3998889437a43bd112d16e6
  const selectedImages = images.slice(0, totalCards / 2);
  cardValues = [...selectedImages, ...selectedImages];
  cardValues.sort(() => Math.random() - 0.5);

  const gameContainer = $("#game-container");
  gameContainer.empty();
  gameContainer.css({
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
  });

  // Crée les cartes et les ajoute à la grille du jeu
  cardValues.forEach((img, index) => {
    const card = $(`  
      <div class="img-cell">
        <div class="card-inner">
          <div class="card-front">
            <img src="images/Background_cards.png" alt="Back">
          </div>
          <div class="card-back">
            <img src="images/${img}" alt="Card">
          </div>
        </div>
      </div>
    `);

    card.data("card-value", img);
    gameContainer.append(card);
  });

  setupCardClicks();
}

/**
 * Fonction pour configurer les clics sur les cartes (retournement, vérification de correspondance).
 */
function setupCardClicks() {
  flippedCards = [];

  $(".img-cell")
    .off("click")
    .on("click", function () {
      if (
        $(this).hasClass("flipped") ||
        $(this).hasClass("matched") ||
        flippedCards.length === 2
      )
        return;

      countscore++;
      $("#score").text(`Score : ${countscore}`);

      const card = $(this);
      card.addClass("flipped");

      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkForMatch();
      }
    });
}

/**
 * Fonction pour vérifier si les deux cartes retournées correspondent.
 */
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const val1 = card1.data("card-value");
  const val2 = card2.data("card-value");

  if (val1 === val2) {
    card1.addClass("matched");
    card2.addClass("matched");
    flippedCards = [];

    // Vérifie si toutes les cartes ont été appariées
    if ($(".img-cell.matched").length === cardValues.length) {
      setTimeout(() => alert("🎉 Bravo, tu as gagné !"), 500);

      const username = localStorage.getItem("username") || "Anonyme";
      const score = countscore;
      const gridSize = $("#grid-size").val();  // Taille de la grille
      const date = new Date().toLocaleString();  // Date du score

      let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

<<<<<<< HEAD
      highScores.push({ name: username, score, gridSize, date, type: currentTheme });
      highScores.sort((a, b) => a.score - b.score); // Tri des scores par ordre croissant
      highScores = highScores.slice(0, 10); // Conserver les 10 meilleurs scores

      localStorage.setItem("highScores", JSON.stringify(highScores));

      // Sauvegarder la dernière partie jouée
=======
      // Sauvegarde le score et les détails du jeu dans localStorage
      highScores.push({ name: username, score, gridSize, date, type: currentTheme });
      highScores.sort((a, b) => a.score - b.score);  // Tri des scores par ordre croissant
      highScores = highScores.slice(0, 10);  // Conserver les 10 meilleurs scores

      localStorage.setItem("highScores", JSON.stringify(highScores));

      // Sauvegarde la dernière partie jouée
>>>>>>> f6dfb109331f7c0ec3998889437a43bd112d16e6
      localStorage.setItem(
        "lastGame" + username,
        JSON.stringify(
          cardValues.map((img) => ({ value: img, src: `images/${img}` }))
        )
      );
    }
  } else {
    setTimeout(() => {
      card1.removeClass("flipped");
      card2.removeClass("flipped");
      flippedCards = [];
    }, 1500);
  }
}
