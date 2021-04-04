const bestPosition = () => {
  let bestPositionScore = -Infinity;
  let bestMove = [];
  for (let i = 0; i < gameBoard[0].length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      // Is this position availabel to be played?
      if (gameBoard[i][j] === "") {
        gameBoard[i][j] = AI_Player;
        let positionScore = minimax(gameBoard, 0, false);
        // Undo the position we just checked
        gameBoard[i][j] = "";
        if (positionScore > bestPositionScore) {
          bestPositionScore = positionScore;
          bestMove = [i, j];
        }
      }
    }
  }
  gameBoard[bestMove[0]][bestMove[1]] = AI_Player;
  currentPlayer = Human_Player;
};

const Scores = {
  X: 1,
  O: -1,
  tie: 0,
};

const minimax = (gameBoard, depth, isMaximizing) => {
  let result = checkWinner();

  if (result) {
    return Scores[result];
  }

  let bestScore;
  if (isMaximizing) {
    bestScore = -Infinity;
    for (let i = 0; i < gameBoard[0].length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        // Is this position availabel to be played?
        if (gameBoard[i][j] === "") {
          gameBoard[i][j] = AI_Player;
          let score = minimax(gameBoard, depth + 1, false);
          // Undo the position we just checked
          gameBoard[i][j] = "";
          bestScore = max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    bestScore = Infinity;
    for (let i = 0; i < gameBoard[0].length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        // Is this position availabel to be played?
        if (gameBoard[i][j] === "") {
          gameBoard[i][j] = Human_Player;
          let score = minimax(gameBoard, depth + 1, true);
          // Undo the position we just checked
          gameBoard[i][j] = "";
          bestScore = min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
};
