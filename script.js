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
const imgList = [
  "Ball.png", "Bands.png", "Bars.png", "Champi.png", "Flower.png",
  "Hearth.png", "Leaves.png", "Star.png", "Waves.png", "Yellow_flower.png",
  "apple.png", "Banana.png","broco.png","cerise.png", "Fraise.png", "piment.png"
];

function startGame(rows, cols) {
  countscore = 0;
  $("#score").text("Score : 0");

  const totalCards = rows * cols;
  if ((totalCards / 2) > imgList.length) {
    alert("Pas assez d’images pour cette taille de grille !");
    return;
  }

  const selectedImages = imgList.slice(0, totalCards / 2);
  cardValues = [...selectedImages, ...selectedImages];
  cardValues.sort(() => Math.random() - 0.5);

  const gameContainer = $("#game-container");
  gameContainer.empty();
  gameContainer.css({
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`
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

  $(".img-cell").off("click").on("click", function () {
    if (
      $(this).hasClass("flipped") ||
      $(this).hasClass("matched") ||
      flippedCards.length === 2
    ) return;

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
      let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

      highScores.push({ name: username, score });
      highScores.sort((a, b) => a.score - b.score);
      highScores = highScores.slice(0, 10);

      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
  } else {
    setTimeout(() => {
      card1.removeClass("flipped");
      card2.removeClass("flipped");
      flippedCards = [];
    }, 1500);
  }
}