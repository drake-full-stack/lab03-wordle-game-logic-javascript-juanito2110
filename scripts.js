// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

document.addEventListener("keydown", (event) => {
    // TODO: Add your code here
    // Hint: Check if game is over first
    // Hint: Convert event.key to uppercase
    // Hint: Handle three cases: BACKSPACE, ENTER, and letters A-Z
    // Hint: Call the appropriate function for each case
    if (gameOver) {
        logDebug("Game is over! Please refresh to play again.", 'warning');
        return;
    }
    const key = event.key.toUpperCase();
    if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        submitGuess();
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    }
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
// document.addEventListener("keydown", (event) => {
//     // Your code here!
// });

// TODO: Implement addLetter function
function addLetter(letter) {
    logDebug(`🎯 addLetter("${letter}") called`, 'info');
    
    // TODO: Check if current row is full (currentTile >= 5)
    // TODO: If full, log error message and return early
    if (currentTile >= 5) {
        logDebug("Current row is full! Cannot add more letters.", 'error');
        return;
    }

    // TODO: Get the current row element using rows[currentRow]
    const currentRowElement = rows[currentRow];

    // TODO: Get all tiles in that row using querySelectorAll('.tile')
    const tiles = currentRowElement.querySelectorAll('.tile');

    // TODO: Get the specific tile using tiles[currentTile]
    const currentTileElement = tiles[currentTile];

    // TODO: Set the tile's textContent to the letter
    currentTileElement.textContent = letter;

    // TODO: Add the 'filled' CSS class to the tile
    currentTileElement.classList.add('filled');

    // TODO: Increment currentTile by 1
    currentTile++;

    // TODO: Log success message with position info
    logDebug(`Letter added to row ${currentRow}, position ${currentTile - 1}: "${letter}"`, 'success');
    logDebug(`Current tile index is now ${currentTile}`, 'info');

    // TODO: Log current word progress using getCurrentWord()
    logDebug(`Current word: "${getCurrentWord()}"`, 'info');
}

// TODO: Implement deleteLetter function  
function deleteLetter() {
    logDebug(`deleteLetter() called`, 'info');
    
    // TODO: Check if there are letters to delete (currentTile <= 0)
    // TODO: If no letters, log error message and return early
    if (currentTile <= 0) {
        logDebug("No letters to delete!", 'error');
        return;
    }

    // TODO: Decrement currentTile FIRST (currentTile--)
    currentTile--;

    // TODO: Get the current row element using rows[currentRow]
    const currentRowElement = rows[currentRow];

    // TODO: Get all tiles in that row using querySelectorAll('.tile')
    const tiles = currentRowElement.querySelectorAll('.tile');

    // TODO: Get the specific tile to clear using tiles[currentTile]
    const tileToClear = tiles[currentTile];

    // TODO: Store the letter being deleted for logging (tile.textContent)
    const deletedLetter = tileToClear.textContent;

    // TODO: Clear the tile's textContent (set to empty string '')
    tileToClear.textContent = '';

    // TODO: Remove the 'filled' class from the tile
    tileToClear.classList.remove('filled');

    // TODO: Log what was deleted and from which position
    logDebug(`Letter deleted from row ${currentRow}, position ${currentTile}: "${deletedLetter}"`, 'info');
    logDebug(`Current tile index is now ${currentTile}`, 'info');

    // TODO: Log current word status using getCurrentWord()
    logDebug(`Current word: "${getCurrentWord()}"`, 'info');
}

// TODO: Implement submitGuess function
function submitGuess() {
    logDebug(`📝 submitGuess() called`, 'info');
    
    // TODO: Check if row has exactly 5 letters (currentTile !== 5)
    // TODO: If not 5 letters, show alert and return early
    if (currentTile !== 5) {
        alert("Not enough letters! Please fill all 5 tiles before submitting.");
        return;
    }
    // TODO: Get the current row element using rows[currentRow]
    const currentRowElement = rows[currentRow];
    // TODO: Get all tiles in that row using querySelectorAll('.tile')
    const tiles = currentRowElement.querySelectorAll('.tile');
    // TODO: Build the guess string by looping through tiles
    let guess = '';
    tiles.forEach(tile => {
        guess += tile.textContent; // add each letter to our word
    });        
    // TODO: Log the guess and target word for debugging
    logDebug(`Guess submitted: "${guess}"`, 'info');
    logDebug(`Target word is: "${TARGET_WORD}"`, 'info');
    // TODO: Call checkGuess(guess, tiles) - we'll implement this next!
    // checkGuess(guess, tiles);
    // TODO: Move to next row: increment currentRow, reset currentTile to 0
    currentRow++;
    currentTile = 0;
    // TODO: Check win condition: if guess === TARGET_WORD, set gameOver = true
    if (guess === TARGET_WORD) {
        gameOver = true;
        setTimeout(() => alert("Congratulations! You won!"), 500);
    }
    // TODO: Check lose condition: if currentRow >= 6, set gameOver = true
    if (currentRow >= 6) {
        gameOver = true;
        setTimeout(() => alert("Game over! You've run out of guesses."), 500);
    }
    // TODO: Show appropriate alert for win/lose (use setTimeout for smoother experience)
    // TODO: Log current game status (won/lost/continuing)
    logDebug(`Game status: ${gameOver ? (guess === TARGET_WORD ? 'Won' : 'Lost') : 'Continuing'}`, 'info');
}

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }