/*
 *  Influenced a lot by:  https://www.youtube.com/watch?v=GTWrWM1UsnA
 * Some code copied and changed from: https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_149_Tic_Tac_Toe/P5/sketch.js
 */

let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let players = ["X", "O"];

let currentPlayer;
let availablePositions = [];

function setup() {
  createCanvas(700, 700);
  currentPlayer = floor(random(players.length));
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      availablePositions.push([i, j]);
    }
  }
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

  if (!winner && availablePositions.length == 0) {
    return "tie";
  }
  return winner;
};

const nextTurn = () => {
  let index = floor(random(availablePositions.length));
  let spot = availablePositions.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  gameBoard[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
};

// function mousePressed() {
//   nextTurn();
// }

function draw() {
  background(0);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(6);
  stroke(255);
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
      if (spot == players[1]) {
        noFill();
        ellipse(xCord, yCord, xRadius * 2);
      } else if (spot == players[0]) {
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

    if (result == "tie") {
      resultDiv.html("Tie!");
    } else {
      resultDiv.html(`${result} is the Winner!`);
    }
  } else {
    nextTurn();
  }
}
