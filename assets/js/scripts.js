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
    document.getElementById("playerXScore").textContent = playerXScore;
    document.getElementById("playerOScore").textContent = playerOScore;
}

function computerMove() {
    if(isComputerPlayer) {
        let emptyCells = board.reduce((acc, cell, index) => cell === '' ? [...acc, index] : acc, []);
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell] = 'O';
        document.getElementById(`cell${randomCell + 1}`).textContent = 'O';
    }
}

function startGame() {
    document.getElementById('playerInput').style.display = 'none';
    document.querySelector('.game-container').classList.add('active');
}

function addPlayer() {
    let playerName = document.querySelector('#playerName').value;
    if (playerName === '') {
        alert('Please enter a name');
    } else {
        alert(`Player ${playerName} added`);
        document.querySelector('#playerName').value = '';
    }
}

document.querySelectorAll('.game-cell').forEach((cell, index) => {
    cell.addEventListener('click', (e) => {
        if(gameOver || board[index] !== '') return;
        
        e.target.textContent = currentPlayer;
        board[index] = currentPlayer;
        
        if(checkWin()) {
            gameOver = true;
            if(currentPlayer === 'X') {
                player1Score++;
            } else {
                player2Score++;
            }
            alert(`We have a winner: Player ${currentPlayer}!`);
            updateScores();
            if(player1Score === 5 || player2Score === 5) {
                alert(`Player ${currentPlayer} is the overall winner!`);
                player1Score = 0;
                player2Score = 0;
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

document.querySelector('#startGame').addEventListener('click', startGame);

document.querySelector('#addPlayer').addEventListener('click', addPlayer);

document.querySelector('.button').addEventListener('click', () => {
board.fill('');
currentPlayer = 'X';
gameOver = false;
document.querySelectorAll('.game-cell').forEach(cell => cell.textContent = '');
});

document.querySelector('.col1 button').addEventListener('click', () => {
isComputerPlayer = !isComputerPlayer;
document.querySelector('.col1 button').textContent = isComputerPlayer ? "Stop" : "Start";
});