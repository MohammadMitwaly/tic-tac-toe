/*
 *  Influenced a lot by:  https://www.youtube.com/watch?v=GTWrWM1UsnA
 * Some code copied and changed from: https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_149_Tic_Tac_Toe/P5/sketch.js
 */
let w, h;

let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let AI_Player = "X";
let Human_Player = "O";
let currentPlayer = Human_Player;

function setup() {
  createCanvas(700, 700);
  w = width / 3;
  h = height / 3;
  bestPosition();
}

const equalsThree = (a, b, c) => {
  return a == b && b == c && a != "";
};

const checkWinner = () => {
  let winner;

  // Check if a horizontal win exists
  gameBoard.forEach((_item, i) => {
    if (equalsThree(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2])) {
      winner = gameBoard[i][0];
    }
  });

  // Vertical winner
  gameBoard.forEach((_item, i) => {
    if (equalsThree(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i])) {
      winner = gameBoard[0][i];
    }
  });

  // Diagonal winner
  if (equalsThree(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
    winner = gameBoard[0][0];
  }
  if (equalsThree(gameBoard[2][0], gameBoard[1][1], gameBoard[0][2])) {
    winner = gameBoard[2][0];
  }

  let availablePositions = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] == "") {
        availablePositions++;
      }
    }
  }

  if (!winner && availablePositions.length == 0) {
    return "tie";
  }
  return winner;
};

// This is called on left-button mouse press
function mousePressed() {
  if (currentPlayer === Human_Player) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (gameBoard[i][j] === "") {
      gameBoard[i][j] = Human_Player;
      currentPlayer = AI_Player;
      bestPosition();
    }
  }
}

// This runs every frame
function draw() {
  background(0);
  strokeWeight(6);
  stroke(255);

  // Draw board shape
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let xCord = w * i + w / 2;
      let yCord = h * j + h / 2;
      let spot = gameBoard[i][j];
      textSize(32);
      let xRadius = w / 4;
      if (spot === Human_Player) {
        noFill();
        ellipse(xCord, yCord, xRadius * 2);
      } else if (spot === AI_Player) {
        line(
          xCord - xRadius,
          yCord - xRadius,
          xCord + xRadius,
          yCord + xRadius
        );
        line(
          xCord + xRadius,
          yCord - xRadius,
          xCord - xRadius,
          yCord + xRadius
        );
      }
    }
  }

  let result = checkWinner();
  if (result) {
    noLoop();
    let resultDiv = createDiv("");
    resultDiv.style("font-size", "32pt");
    resultDiv.style("color", "white");

    if (result === "tie") {
      resultDiv.html("Tie!");
    } else {
      resultDiv.html(`${result} is the Winner!`);
    }
  }
}
