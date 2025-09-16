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

function createPlayer(name, token) {
  return {
    name,
    token,
    choice([x, y]) {
      gameState.board[x][y] ||= token;
    },
  };
}

const player1 = createPlayer("Jack", "⨯");
const player2 = createPlayer("Bobby", "〇");

function activePlayer() {
  if (gameState.turn === 1) return player1;
  if (gameState.turn === 2) return player2;
}

function getChoice(selectedCell) {
  // const selectedCell = prompt(`${activePlayer().name}, your move:`);
  activePlayer().choice(selectedCell);
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

// function playGame() {
//   while (gameState.status) {
//     getChoice();
//     updateBoard();
//     hasWinner();
//   }
// }

// ### DOM ###

const gameBoard = document.getElementById("game-board");

gameState.board.forEach((row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    const cellBtn = document.createElement("button");
    cellBtn.classList.add("cell");
    cellBtn.dataset.coordination = `${rowIndex}${cellIndex}`;
    gameBoard.appendChild(cellBtn);
  });
});

const cellBtns = document.querySelectorAll(".cell");

function updateBoard() {
  const flatBoard = gameState.board.flat();
  cellBtns.forEach((btn, i) => (btn.textContent = flatBoard[i]));
}

function gameAction(choice) {
  getChoice(choice);
  updateBoard();
  hasWinner();
}

gameBoard.addEventListener("click", (e) => {
  gameAction(e.target.dataset.coordination);
});
