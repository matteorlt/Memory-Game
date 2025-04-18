const gridSize = 12;
let grid = [];
let snake = [{ x: 5, y: 5 }];
let apple = null;
let direction = "RIGHT";
let gameInterval = null;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
  const gridElement = document.getElementById("grid");
  const startButton = document.getElementById("start-button");

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `cell-${x}-${y}`;
      gridElement.appendChild(cell);
    }
  }

  startButton.addEventListener("click", () => {
    resetGame();
    drawSnake();
    spawnApple();
    startGame();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "DOWN") {
      direction = "UP";
    } else if (e.key === "ArrowDown" && direction !== "UP") {
      direction = "DOWN";
    } else if (e.key === "ArrowLeft" && direction !== "RIGHT") {
      direction = "LEFT";
    } else if (e.key === "ArrowRight" && direction !== "LEFT") {
      direction = "RIGHT";
    }
  });
});

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  direction = "RIGHT";
  score = 0
  resetGrid();
  clearInterval(gameInterval);
}

function resetGrid() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.getElementById(`cell-${x}-${y}`);
      if (cell) {
        cell.className = "cell";
      }
    }
  }
}

function drawSnake() {
  snake.forEach((segment) => {
    const cell = document.getElementById(`cell-${segment.x}-${segment.y}`);
    if (cell) {
      cell.classList.add("snake");
    }
  });
}

function spawnApple() {
  let appleX = Math.floor(Math.random() * gridSize);
  let appleY = Math.floor(Math.random() * gridSize);

  while (isAppleOnSnake(appleX, appleY)) {
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  apple = { x: appleX, y: appleY };

  const appleCell = document.getElementById(`cell-${appleX}-${appleY}`);
  if (appleCell) {
    appleCell.classList.add("apple");

    score++;
    updateScore();
  }
}

function isAppleOnSnake(x, y) {
  return snake.some((segment) => segment.x === x && segment.y === y);
}

function removeApple() {
  if (apple) {
    const appleCell = document.getElementById(`cell-${apple.x}-${apple.y}`);
    if (appleCell) appleCell.classList.remove("apple");
    apple = null;
  }
}

function startGame() {
  gameInterval = setInterval(moveSnake, 200);
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.textContent = `Score: ${score}`;
    }
  }

function moveSnake() {
  const head = { ...snake[0] };

  if (direction === "UP") head.y--;
  else if (direction === "DOWN") head.y++;
  else if (direction === "LEFT") head.x--;
  else if (direction === "RIGHT") head.x++;

  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    gameOver();
    return;
  }

  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    removeApple(); // Supprime la pomme
    spawnApple();  // Génère une nouvelle pomme
  } else {
    const tail = snake.pop();
    const tailCell = document.getElementById(`cell-${tail.x}-${tail.y}`);
    if (tailCell) {
      tailCell.classList.remove("snake");
    }
  }

  drawSnake();
}

function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Vous avez perdu!");
  resetGame();
}
