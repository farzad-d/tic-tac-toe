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
  const lines = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const checkLines = () =>
    lines.some((line) =>
      line.every(([x, y]) => gameState.board[x][y] === activePlayer().token)
    );

  if (checkLines()) {
    gameState.status = false;
    alert(`You won ${activePlayer().name}!`);
  }

  gameState.turn = gameState.turn === 1 ? 2 : 1;
}

function getChoice() {
  const selectedCell = prompt(`${activePlayer().name}, your move:`);
  activePlayer().choice(selectedCell);
}

function playGame() {
  while (gameState.status) {
    getChoice();
    updateBoard();
    hasWinner();
  }
}

// playGame();
