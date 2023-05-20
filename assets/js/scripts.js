// Variables to store player scores and current round
let playerXScore = 0;
let playerOScore = 0;
let currentRound = 1;

// Variables to keep track of the game mode and whether play is active
let gameMode = null;
let gameInProgress = false;

// Create an array to store each cell's value.
let board = ["", "", "", "", "", "", "", "", ""];

// Create an array with all viable winning combinations.
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Identify who the current player is.
let currentPlayer = "X";

// Adds an event listener to each cell.
for (let i = 1; i <= 9; i++) {
  const cell = document.getElementById(`cell${i}`);
  cell.addEventListener("click", handleCellClick);
}

// Add event listeners to the game mode selection buttons.
document.getElementById("playerVsPlayer").addEventListener("click", () => handleGameModeSelection("playerVsPlayer"));
document.getElementById("playerVsMachine").addEventListener("click", () => handleGameModeSelection("playerVsMachine"));

// Add an event listener to the Restart button to refresh the page.
document.getElementById("restartBtn").addEventListener("click", () => location.reload());

// Function to deal with game mode selection and game launch
function handleGameModeSelection(mode) {
  gameMode = mode;
  gameInProgress = true;
  document.querySelector(".game-container").classList.add("active");
  document.getElementById("restartBtn").classList.add("active");
}

// Function to deal with a cell's click
function handleCellClick(event) {
    // If the game is not in progress or the cell has already been filled, return.
    if (!gameInProgress || event.target.textContent !== "") return;

    // Add the current player's icon to the board array
    event.target.textContent = currentPlayer;
    board[parseInt(event.target.id.slice(4)) - 1] = currentPlayer;

  // Check to see if the current player won.
  if (checkWin(currentPlayer)) {
    // Increases the winner's point total
    currentPlayer === "X" ? playerXScore++ : playerOScore++;

    // Updates the page's punctuation
    updateScores();

    // If this was the fifth round, the game concludes, so the next round is started.
    if (currentRound === 5) {
      endGame();
    } else {
      startNextRound();
    }
  } else if (checkTie()) {
    alert("It's a tie!");
    startNextRound();
  } else {
    // If no one won as of yet, the current player is changed.
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameMode === "playerVsMachine" && currentPlayer === "O") {
        computerMove();
    }
  }
}

function computerMove() {
  let emptyCells = [];
  
  for (var i = 0; i < board.length; i++) {
    if (board[i] == '') {
      emptyCells.push(i);
    }
  }
  
  let move = -1;
  for(let i = 0; i < winningCombinations.length; i++) {
    let combination = winningCombinations[i];
    if (board[combination[0]] === board[combination[1]] && board[combination[0]] !== "" && board[combination[2]] === "") {
      move = combination[2];
    } else if (board[combination[1]] === board[combination[2]] && board[combination[1]] !== "" && board[combination[0]] === "") {
      move = combination[0];
    } else if (board[combination[0]] === board[combination[2]] && board[combination[0]] !== "" && board[combination[1]] === "") {
      move = combination[1];
    }
  }

  if (move === -1) {
    move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  setTimeout(() => {
    board[move] = currentPlayer;
    document.getElementById(`cell${move + 1}`).textContent = currentPlayer;
  
    // Check to see if the computer won.
    if (checkWin(currentPlayer)) {
      // Increases the winner's point total
      currentPlayer === "X" ? playerXScore++ : playerOScore++;

      // Updates the page's punctuation
      updateScores();

      // If this was the fifth round, the game concludes, so the next round is started.
      if (currentRound === 5) {
        endGame();
      } else {
        startNextRound();
      }
    } else if (checkTie()) {
      alert("It's a tie!");
      startNextRound();
    } else {
      // If no one won as of yet, the current player is changed.
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }, 2000); // 2000 milliseconds = 2 seconds delay before the computer makes a move

  
  board[move] = currentPlayer;
  document.getElementById(`cell${move + 1}`).textContent = currentPlayer;
  
  // Check to see if the computer won.
  if (checkWin(currentPlayer)) {
    // Increases the winner's point total
    currentPlayer === "X" ? playerXScore++ : playerOScore++;

    // Updates the page's punctuation
    updateScores();

    // If this was the fifth round, the game concludes, so the next round is started.
    if (currentRound === 5) {
      endGame();
    } else {
      startNextRound();
    }
  } else if (checkTie()) {
    alert("It's a tie!");
    startNextRound();
  } else {
    // If no one won as of yet, the current player is changed.
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Function to determine whether a player won
function checkWin(player) {
    return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
    );
}

// Function to check for a tie
function checkTie() {
  return board.every(cell => cell !== "");
}

// Function to prepare the game for the upcoming round
function startNextRound() {
  // Clear the board
  board = ["", "", "", "", "", "", "", "", ""];
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`cell${i}`).textContent = "";
  }

  // Player X always starts
  currentPlayer = "X";
  
  // Increment current round
  currentRound++;

  // If machine should start the round
  if (gameMode === "playerVsMachine" && currentPlayer === "O") {
    computerMove();
  }
}
    
// Function to stop the game after 5 rounds
function endGame() {
  gameInProgress = false;
    
  if (playerXScore > playerOScore) {
    alert("Player X wins the game!");
  } else if (playerOScore > playerXScore) {
    alert("Player O wins the game!");
  } else {
    alert("The game is a draw!");
  }
}
    
// Function to update the scores
function updateScores() {
  document.getElementById("playerXScore").textContent = playerXScore;
  document.getElementById("playerOScore").textContent = playerOScore;
}

