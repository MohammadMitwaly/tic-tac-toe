const gameBoard = [
  ["X", "O", "X"],
  ["X", "O", "O"],
  ["O", "X", "X"],
];

let boardWidth = 3;
let boardHeight = 3;

let players = ["X", "O"];

function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0);
  let w = width / boardWidth;
  let h = height / boardHeight;
  gameBoard.forEach((row, j) => {
    row.forEach((column, i) => {
      let xCord = w * i + w / 2;
      let yCord = h * j + h / 2;
      let decision = gameBoard[i][j];
      stroke(255);
      strokeWeight(5);
      let xRadius = w / 4;
      if (decision === players[1]) {
        noFill();
        ellipse(xCord, yCord, xRadius * 2);
      } else if (decision === players[0]) {
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
    });
  });

  noLoop();
}
