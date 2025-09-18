let gameState = {
  board: [],
  turn: 1,
  result: "",
};

const boardCreator = (function () {
  for (let i = 0; i < 3; i++) {
    gameState.board[i] = [];
    for (let j = 0; j < 3; j++) {
      gameState.board[i].push("");
    }
  }
})();

const boardDisplay = document.getElementById("game-board");

gameState.board.forEach((row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    const cellBtn = document.createElement("button");
    cellBtn.classList.add("cell");
    cellBtn.dataset.coordination = `${rowIndex}${cellIndex}`;
    boardDisplay.appendChild(cellBtn);
  });
});

const cellBtns = document.querySelectorAll(".cell");

function updateBoard() {
  const flatBoard = gameState.board.flat();
  cellBtns.forEach((btn, i) => (btn.textContent = flatBoard[i]));
  gameMessage();
}

function createPlayer(name, token) {
  return {
    name,
    token,
    choice([x, y]) {
      gameState.board[x][y] ||= token;
    },
  };
}

const form = document.querySelector("form");

const playerControl = {
  players: [],
  setPlayers() {
    const formData = new FormData(form);
    const p1Name = formData.get("p1-name");
    const p2Name = formData.get("p2-name");
    const p1Token = formData.get("p1-token");
    const p2Token = formData.get("p2-token");

    this.players = [
      createPlayer(p1Name, p1Token),
      createPlayer(p2Name, p2Token),
    ];
    updateBoard();
  },
  activePlayer() {
    return this.players[gameState.turn - 1];
  },
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  playerControl.setPlayers();
  form.reset();
  createPlayerDialog.close();
});

function getChoice(selectedCell) {
  playerControl.activePlayer().choice(selectedCell);
}

function resultCheck() {
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

  const winCheck = () =>
    lines.some((line) =>
      line.every(
        ([x, y]) => gameState.board[x][y] === playerControl.activePlayer().token
      )
    );

  const drawCheck = () => gameState.board.flat().every((cell) => cell);

  if (winCheck()) {
    gameState.result = "win";
  } else if (drawCheck()) {
    gameState.result = "draw";
  } else {
    gameState.turn = gameState.turn === 1 ? 2 : 1;
  }
}

function gameMessage() {
  const message = document.querySelector("h2");

  if (!gameState.result) {
    message.textContent = `${playerControl.activePlayer().name}, your move`;
  } else if (gameState.result === "win") {
    message.className = "win-message";
    message.textContent = `You won ${playerControl.activePlayer().name}!`;
  } else {
    message.className = "draw-message";
    message.textContent = "Draw.";
  }
}

function gameAction(choice) {
  getChoice(choice);
  resultCheck();
  updateBoard();
}

boardDisplay.addEventListener("click", (event) => {
  if (gameState.result) return;
  gameAction(event.target.dataset.coordination);
  event.target.disabled = true;
  event.target.style.borderColor = "gray";
  event.target.style.backgroundColor = "#262626";
});

const restartBtn = document.getElementById("restart-btn");
const closeDialogBtn = document.getElementById("close-dialog-btn");
const createPlayerDialog = document.getElementById("create-player-dialog");

restartBtn.addEventListener("click", () => createPlayerDialog.showModal());
closeDialogBtn.addEventListener("click", () => createPlayerDialog.close());

createPlayerDialog.showModal();
playerControl.setPlayers();

// todo: Make restart button functional
