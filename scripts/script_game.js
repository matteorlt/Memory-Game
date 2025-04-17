$(document).ready(function () {
  $(".btn.btn-primary.custom-btn").on("click", function () {
    const selectedSize = $("#grid-size").val();
    const [rows, cols] = selectedSize.split("x").map(Number);
    startGame(rows, cols);
  });

  $(document).on("keydown", function (e) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      const selectedSize = $("#grid-size").val();
      const [rows, cols] = selectedSize.split("x").map(Number);
      startGame(rows, cols);
    }
  });
});

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

function startGame(rows, cols) {
  countscore = 0;
  $("#score").text("Score : 0");

  const totalCards = rows * cols;
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
    alert("Pas assez d’images pour cette taille de grille !");
    return;
  }

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

function checkForMatch() {
  const [card1, card2] = flippedCards;
  const val1 = card1.data("card-value");
  const val2 = card2.data("card-value");

  if (val1 === val2) {
    card1.addClass("matched");
    card2.addClass("matched");
    flippedCards = [];

    if ($(".img-cell.matched").length === cardValues.length) {
      setTimeout(() => alert("🎉 Bravo, tu as gagné !"), 500);

      const username = localStorage.getItem("username") || "Anonyme";
      const score = countscore;
      const gridSize = $("#grid-size").val(); // Taille de la grille
      const date = new Date().toLocaleString(); // Date du score

      let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

      highScores.push({ name: username, score, gridSize, date, type: currentTheme });
      highScores.sort((a, b) => a.score - b.score); // Tri des scores par ordre croissant
      highScores = highScores.slice(0, 10); // Conserver les 10 meilleurs scores

      localStorage.setItem("highScores", JSON.stringify(highScores));

      // Sauvegarder la dernière partie jouée
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