// Script.js
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let playerXScore = 0;
let playerOScore = 0;
let isComputerPlayer = false;

// Winning combinations
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for(let line of winningLines) {
        if(board[line[0]] === currentPlayer && 
           board[line[1]] === currentPlayer && 
           board[line[2]] === currentPlayer) {
            return true;
        }
    }
    return false;
}

function updateScores() {
    document.querySelector(".scores p:nth-child(2)").textContent = `Player X: ${playerXScore}`;
    document.querySelector(".scores p:nth-child(3)").textContent = `Player O / Machine: ${playerOScore}`;
}

function computerMove() {
    if(isComputerPlayer) {
        let emptyCells = board.reduce((acc, cell, index) => cell === '' ? [...acc, index] : acc, []);
        if(emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[randomCell] = 'O';
            document.getElementById(`cell${randomCell + 1}`).textContent = 'O';
            currentPlayer = 'X';
        }
    }
}

function startGame() {
    document.querySelector('.game-setup').style.display = 'none';
    document.querySelector('.game-container').style.display = 'flex';
    isComputerPlayer = document.querySelector('#gameMode').value === 'pvm';
    if(isComputerPlayer) {
        alert("Start the game Player vs Machine");
    } else {
        alert("Start the game Player vs Player");
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.querySelectorAll('.game-cell').forEach(cell => cell.textContent = '');
    document.querySelector('.game-setup').style.display = 'flex';
    document.querySelector('.game-container').style.display = 'none';
    alert("Restart the game");
}

document.querySelectorAll('.game-cell').forEach((cell, index) => {
    cell.addEventListener('click', (e) => {
        if(gameOver || board[index] !== '') return;
        
        e.target.textContent = currentPlayer;
        board[index] = currentPlayer;
        
        if(checkWin()) {
            gameOver = true;
            if(currentPlayer === 'X') {
                playerXScore++;
            } else {
                playerOScore++;
            }
            alert(`We have a winner: Player ${currentPlayer}!`);
            updateScores();
            if(playerXScore === 5 || playerOScore === 5) {
                alert(`Player ${currentPlayer} is the overall winner!`);
                playerXScore = 0;
                playerOScore = 0;
                updateScores();
            }
        } else if(!board.includes('')) {
            alert("It's a draw!");
            gameOver = true;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if(!gameOver) computerMove();
    });
});
        
        document.querySelector('#startBtn').addEventListener('click', startGame);
        document.querySelector('#restartBtn').addEventListener('click', restartGame);
