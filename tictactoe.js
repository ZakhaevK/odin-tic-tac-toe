// IIFE for the gameBoard utilised by the game
const gameBoard = (function () {
  let board = [ 
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const getBoard = () => {
    return board;
  }

  const printBoard = () => {
    for (let row of board) {
      console.log(row);
    }
  };

  const takePosition = (player, x, y) => {
    if (x > 2 || x < 0 || y > 2 || y < 0) {
      console.log("Invalid coordinates");
    } else {
      board[x][y] = player.getSymbol();
    }
  };

  const clearBoard = () => {
    board = [ 
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  };

  return { getBoard, printBoard, takePosition, clearBoard };
})();

// IIFE featuring all DOM functions
const DOMHandler = (function () { 

})

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

// Each game is created using this factory
function createGame(gameBoard, player1, player2) {
  let currentPlayer = player1;

  const playTurn = () => {
    let posX = parseInt(prompt(`${currentPlayer.getName()}, enter row:`));
    let posY = parseInt(prompt(`${currentPlayer.getName()}, enter column:`));
    if (posX < 0 || posX > 2 || posY < 0 || posY > 2 ) {
      console.log("Invalid coordinates, try again")
      posX = parseInt(prompt(`${currentPlayer.getName()}, enter row:`));
      posY = parseInt(prompt(`${currentPlayer.getName()}, enter column:`));
    }
    gameBoard.takePosition(currentPlayer, posX, posY);
  };

  const playGame = () => {
    let gameFinished = false;
    let turns = 0;
    while (!gameFinished && turns < 9) {
      playTurn();
      gameBoard.printBoard();
      gameFinished = checkWinner(currentPlayer);
      if (gameFinished) {
        currentPlayer.wonGame();
        console.log(`The winner is ${currentPlayer.getName()}`);
        return;
      }
      turns++;
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }
    console.log("Game is tied!");
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

  return { playTurn, playGame, checkWinner };
}

const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');
const game = createGame(gameBoard, player1, player2);
game.playGame();
