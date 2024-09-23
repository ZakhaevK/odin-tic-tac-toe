// IIFE for the gameBoard utilised by the game
const gameBoard = (function () {
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const getBoard = () => board;

  const takePosition = (player, x, y) => {
    if (board[x][y] === '') {
      board[x][y] = player.getSymbol();
      return true;
    } else {
      console.log("Position already taken.");
      return false;
    }
  };

  const clearBoard = () => {
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  };

  return { getBoard, takePosition, clearBoard };
})();


// Creation of player and related data
function createPlayer(name, symbol) {
  let wins = 0;

  const getName = () => name;

  const getSymbol = () => symbol;

  const getWins = () => wins;

  const wonGame = () => {
    wins++;
  };

  return { getName, getSymbol, getWins, wonGame };
}

// The game is created using this factory
function createGame(gameBoard, player1, player2) {
  let currentPlayer = player1;
  let gameInProgress = true;

  const playTurn = (position) => {
    if (!gameInProgress) return;
    // This converts to positin to 2D for board update
    const posX = Math.floor(position / 3);
    const posY = position % 3;

    if (!gameBoard.takePosition(currentPlayer, posX, posY)) return;

    DOMHandler.updateCell(position, currentPlayer.getSymbol());

    if (checkWinner(currentPlayer)) {
      currentPlayer.wonGame();
      DOMHandler.updateWins(currentPlayer);
      gameInProgress = false;
      console.log(`${currentPlayer.getName()} wins!`);
    } else {
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
  };

  const resetGame = () => {
    gameBoard.clearBoard();
    DOMHandler.clearCells();
    currentPlayer = player1;
    gameInProgress = true;
  };

  const checkWinner = (player) => {
    let count = 0;
    let board = gameBoard.getBoard();

    // Check rows for winner
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == player.getSymbol()) { count++; }
        if (count == 3) { return true; }
      }
      count = 0;
    }

    // Check columns for winner
    count = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[j][i] == player.getSymbol()) { count++; }
        if (count == 3) { return true; }
      }
      count = 0;
    }

    // Check diagonal lines
    count = 0;
    for (let i = 0; i < 3; i++) {
      if (board[i][i] == player.getSymbol()) { count++; }
      if (count == 3) { return true; }
    }

    count = 0;
    for (let i = 0, j = 2; i < 3; i++, j--) {
      if (board[i][j] == player.getSymbol()) { count++; }
      if (count == 3) { return true; }
    }

    return false;
  };

  return { playTurn, resetGame };
}

// Initialisation of all objects for game
const p1Name = prompt("What is Player 1's name?")
const p2Name = prompt("What is Player 2's name?")

const player1 = createPlayer(p1Name, 'X');
const player2 = createPlayer(p2Name, 'O');

// IIFE featuring all DOM functions, uses player names so needs to be here
const DOMHandler = (function () {
  const p1WinsPara = document.getElementById("p1-wins");
  const p2WinsPara = document.getElementById("p2-wins");
  const gameWinnerPara = document.getElementById("game-winner");
  const gridCells = document.querySelectorAll(".cell");

  p1WinsPara.textContent = `${player1.getName()}'s Wins: 0`;
  p2WinsPara.textContent = `${player2.getName()}'s Wins: 0`;

  const updateCell = (position, symbol) => {
    gridCells[position].textContent = symbol;
  };

  const addClickListeners = (playTurn) => {
    gridCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const position = cell.getAttribute("data-position");
        playTurn(position);
      });
    });
  };

  const updateWins = (player) => {
    if (player === player1) {
      p1WinsPara.textContent = `${player1.getName()}'s Wins: ${player1.getWins()}`;
    } else {
      p2WinsPara.textContent = `${player2.getName()}'s Wins: ${player2.getWins()}`;
    }
    gameWinnerPara.textContent = `${player.getName()} has won the match!`
  };

  const clearCells = () => {
    gridCells.forEach((cell) => {
      cell.textContent = "";
    });
    gameWinnerPara.textContent = "";
  };

  return { updateCell, addClickListeners, updateWins, clearCells };
})();


// Game initialisation and related listeners
const game = createGame(gameBoard, player1, player2);

DOMHandler.addClickListeners(game.playTurn);
document.getElementById("new-game").addEventListener("click", game.resetGame);