let gameState = {
  board: [],
  // activePlayer: 1,
  // status: true,
};

const boardCreator = (function () {
  for (let i = 0; i < 3; i++) {
    gameState.board[i] = [];
    for (let j = 0; j < 3; j++) {
      gameState.board[i].push("");
    }
  }
})();

function updateBoard() {
  console.log(gameState.board);
}

function createPlayer(name, token) {
  return {
    name,
    token,
    addToken(row, col) {
      gameState.board[row - 1][col - 1] ||= token;
      updateBoard();
    },
  };
}

const player1 = createPlayer("Jack", "X");
const player2 = createPlayer("Bobby", "O");

player1.addToken(2, 2);
player2.addToken(3, 3);
player1.addToken(3, 3);
