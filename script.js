const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function handleCellClick(e) {
  const idx = e.target.getAttribute('data-index');
  if (board[idx] || !gameActive) return;
  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWin();
}

function checkWin() {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(`${currentPlayer} wins!`);
      return;
    }
  }
  if (!board.includes(null)) {
    endGame('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function endGame(msg) {
  gameActive = false;
  message.textContent = msg;
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => cell.textContent = '');
  message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
message.textContent = `Player ${currentPlayer}'s turn`;