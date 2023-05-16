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
    // If the game is not in progress or the cell has already been preenchimed, return.
    if (!gameInProgress || event.target.textContent !== "") return;
    
    // Add the current player's icon to the cymbidium and the table's array
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
    } else {
      // If no one won as of yet, the current player is changed.
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }