let gameState = {
  board: [],
  turn: 1,
  status: true,
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
    choice(cell) {
      const row = cell[0] - 1;
      const col = cell[1] - 1;
      gameState.board[row][col] ||= token;
    },
  };
}

const player1 = createPlayer("Jack", "X");
const player2 = createPlayer("Bobby", "O");

function activePlayer() {
  if (gameState.turn === 1) return player1;
  if (gameState.turn === 2) return player2;
}

function hasWinner() {
  const c11 = gameState.board[0][0];
  const c12 = gameState.board[0][1];
  const c13 = gameState.board[0][2];
  const c21 = gameState.board[1][0];
  const c22 = gameState.board[1][1];
  const c23 = gameState.board[1][2];
  const c31 = gameState.board[2][0];
  const c32 = gameState.board[2][1];
  const c33 = gameState.board[2][2];

  function checkLines(line) {
    if (line.every((c) => c === activePlayer().token)) {
      gameState.status = false;
      alert(`You won ${activePlayer().name}!`);
    }
  }

  checkLines([c11, c12, c13]);
  checkLines([c21, c22, c23]);
  checkLines([c31, c32, c33]);
  checkLines([c11, c21, c31]);
  checkLines([c12, c22, c32]);
  checkLines([c13, c23, c33]);
  checkLines([c11, c22, c33]);
  checkLines([c13, c22, c31]);

  gameState.turn = gameState.turn === 1 ? 2 : 1;
}

function getChoice() {
  const selectedCell = prompt(`${activePlayer().name}, your move:`);
  activePlayer().choice(selectedCell);
}

while (gameState.status) {
  getChoice();
  updateBoard();
  hasWinner();
}
