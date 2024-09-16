
const gameBoard = (function () {
  const board = [ ['', '', '']
                  ['', '', '']
                  ['', '', ''] ]

  const getBoard = (() => {
    for (row in board) {
      console.log(row);
    }
  })

  const takePosition = (function (player, x, y) {
    if (x > 2 || x < 0 || y > 2 || y < 0) {
      return console.log("Invalid coordinates")
    } else {
      board[x][y] = player.getSymbol();
    }
  })

  const clearBoard = (() => {
    board = [ ['', '', '']
              ['', '', '']
              ['', '', ''] ]
  })
  
  return {getBoard, takePosition, clearBoard}
})

function createPlayer (name, symbol) {
  const name = name;
  const symbol = symbol;
  const wins = 0;

  const getName = (() => {
    return name;
  })

  const getSymbol = (() => {
    return symbol;
  })

  const getWins = (() => {
    return wins;
  })

  const wonGame = (() => {
    wins++;
  })

  return {getName, getSymbol, getWins, wonGame};
}

function game (gameBoard, Player1, Player2) {
  
}
