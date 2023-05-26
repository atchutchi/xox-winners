//jshint esversion: 6 

// This code is adapted from the tic-tac-toe game by janschreiber on CodePen: https://codepen.io/janschreiber/pen/xZbEvM
// Original code credit goes to janschreiber

// Variables to store player scores and current round
let playerXScore = 0;
let playerOScore = 0;
let currentRound = 1;
const totalRounds = 5; // Sets the total number of rounds

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

// Get the new elements
const roundDisplay = document.getElementById('round-display');
const roundNumber = document.getElementById('round-number');
const roundResult = document.getElementById('round-result');
const continueBtn = document.getElementById('continue-btn');

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
  
  // Add event listeners to the game mode selection buttons.
  document.getElementById("playerVsPlayer").addEventListener("click", () => handleGameModeSelection("playerVsPlayer"));
  document.getElementById("playerVsMachine").addEventListener("click", () => handleGameModeSelection("playerVsMachine"));
  
  // Add an event listener to the Restart button to refresh the page.
  document.getElementById("restartBtn").addEventListener("click", () => location.reload());
  
  // Add event listener to the Continue button
  continueBtn.addEventListener('click', continueGame);

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
  
      // End the game if a player has won 5 times
      if (playerXScore >= 5 || playerOScore >= 5) {
          endGame();
      } else {
          startNextRound();
      }
      roundResult.textContent = `Player ${currentPlayer} Won!`; // Display round result
      document.querySelector(".game-container").classList.remove("active");
      document.getElementById("restartBtn").classList.remove("active");
      roundDisplay.style.display = 'block'; // Show round display
   } else if (checkTie()) {
      startNextRound();
      roundResult.textContent = `It's a Tie!`; // Display round result
      document.querySelector(".game-container").classList.remove("active");
      document.getElementById("restartBtn").classList.remove("active");
      roundDisplay.style.display = 'block'; // Show round display
   } else {
      // If no one won as of yet, the current player is changed.
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (gameMode === "playerVsMachine" && currentPlayer === "O") {
          setTimeout(computerMove, 1000); // Wait for 1 seconds before the computer makes its move
          for (let i = 1; i <= 9; i++) {
              document.getElementById(`cell${i}`).removeEventListener("click", handleCellClick);
          }
      }
    }
  }

// This function represents the action of the computer making a move.
// It works for the game mode where the human player is playing against the computer.
function computerMove() {
  // Create an array to store the indices of the empty cells on the board.
  let emptyCells = [];
  // Loop through the board. If a cell is empty (its value is an empty string), 
  // push its index to the emptyCells array.
  for (var i = 0; i < board.length; i++) {
    if (board[i] == '') {
      emptyCells.push(i);
    }
  }
  
  // Initially, set the computer's move to an invalid index (-1).
  let move = -1;
    //The computer tries to find a winning move. It looks for two similar values in a winning combination and an empty space to complete the combo.
    //If such a move is found, it sets the move variable to the index of that empty space.
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
  // If no winning combination is found, the computer makes a random move.
  // It picks a random index from the array of empty cells and sets the move
  if (move === -1) {
    move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
  
  // The computer makes its move by placing its marker ("O") at the chosen index 
  // on the board and reflecting this move on the display.
  board[move] = currentPlayer;
  document.getElementById(`cell${move + 1}`).textContent = currentPlayer;
  
    //After the computer makes its move, it checks if it has won the game.
    //If it has, it increases its score, updates the scores on the display, and checks if the game is over (i.e., if it was the last round).
    //If the game is not over, it starts the next round.
    //If the game has resulted in a tie, it alerts the user and starts the next round.
    //If the game is not over and it's not a tie, it simply changes the current player.
    if (checkWin(currentPlayer)) {
        // Increases the winner's point total
        currentPlayer === "X" ? playerXScore++ : playerOScore++;
    
        // Updates the page's punctuation
        updateScores();
    
        // End the game if a player has won 5 times
        if (playerXScore >= 5 || playerOScore >= 5) {
            endGame();
        } else {
            startNextRound();
        }
        roundResult.textContent = `Player ${currentPlayer} Won!`; // Display round result
      } else if (checkTie()) {
        alert("It's a tie!");
        startNextRound();
        roundResult.textContent = `It's a Tie!`; // Display round result
      } else {
        // If no one won as of yet, the current player is changed.
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
      for (let i = 1; i <= 9; i++) {
        document.getElementById(`cell${i}`).addEventListener("click", handleCellClick);
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
    
// Function to stop the game after the last round
function endGame() {

  gameInProgress = false;
  if (playerXScore >= 5) {
    alert("Player X wins the game!");
    playerXScore = 0;
    playerOScore = 0;
  } else if (playerOScore >= 5) {
    alert("Player O wins the game!");
    playerXScore = 0;
    playerOScore = 0;
  } else {
    return;
  }

  // Reset scores and current round to restart the game
  currentRound = 1;
  updateScores();

  // Start the next round
  startNextRound();
}


// Function to update the scores
function updateScores() {
  document.getElementById("playerXScore").textContent = playerXScore;
  document.getElementById("playerOScore").textContent = playerOScore;
}