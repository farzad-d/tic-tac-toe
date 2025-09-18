let gameState = {
  board: [],
  turn: 1,
  result: "",
};

const cellContainer = document.getElementById("cell-container");

function boardCreator() {
  for (let i = 0; i < 3; i++) {
    gameState.board[i] = [];
    for (let j = 0; j < 3; j++) {
      gameState.board[i].push("");
    }
  }

  cellContainer.replaceChildren();
  gameState.board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellBtn = document.createElement("button");
      cellBtn.classList.add("cell");
      cellBtn.dataset.coordination = `${rowIndex}${cellIndex}`;
      cellContainer.appendChild(cellBtn);
    });
  });
}

function updateBoard() {
  const cellBtns = document.querySelectorAll(".cell");
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

const playersControl = {
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
  playersControl.setPlayers();
  form.reset();
  createPlayerDialog.close();
});

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
        ([x, y]) =>
          gameState.board[x][y] === playersControl.activePlayer().token
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
    message.className = "";
    message.textContent = `${playersControl.activePlayer().name}, your move:`;
  } else if (gameState.result === "win") {
    message.className = "win-message";
    message.textContent = `You won ${playersControl.activePlayer().name}!`;
  } else {
    message.className = "draw-message";
    message.textContent = "Draw.";
  }
}

function gameAction(choice) {
  playersControl.activePlayer().choice(choice);
  resultCheck();
  updateBoard();
}

cellContainer.addEventListener("click", (event) => {
  if (event.target === cellContainer) return;
  if (gameState.result) return;
  gameAction(event.target.dataset.coordination);
  event.target.disabled = true;
  event.target.style.borderColor = "gray";
  event.target.style.backgroundColor = "#262626";
});

const createPlayerDialog = document.getElementById("create-player-dialog");

function gameStartRestart() {
  gameState.board = [];
  gameState.turn = 1;
  gameState.result = "";
  boardCreator();
  createPlayerDialog.showModal();
  playersControl.setPlayers();
}

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => gameStartRestart());

const closeDialogBtn = document.getElementById("close-dialog-btn");
closeDialogBtn.addEventListener("click", () => {
  createPlayerDialog.close();
  form.reset();
});

gameStartRestart();
