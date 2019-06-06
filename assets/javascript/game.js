var gameBoard       = document.getElementById("gameBoard");
var gameCancelBtn   = document.getElementById("game-cancel-btn");
var xWinCounter     = document.getElementById("winCount");
var xLossCounter    = document.getElementById("lossCount");
var gameWordText    = document.getElementById("gameWord");
var letterGuessText = document.getElementById("wrongLetters");
var remainingGuessesText = document.getElementById("total-guesses");

var iWins           = 0;
var iLosses         = 0;
var iTotalGuesses   = 10;
var iRemainingGuesses = iTotalGuesses;

var playMode        = false;
var gameWord;
var remainingLetters = 0;
var answeredArray = [];
var guessWrongLetters = [];

var words = {
    "game1Words": {
        "keyValue": [
            "ANA",
            "ASHE",
            "BAPTISTE",
            "BASTION",
            "BRIGITTE",
            "DVA",
            "DOOMFIST",
            "GENJI",
            "HANZO",
            "JUNKRAT",
            "LUCIO",
            "MCCREE",
            "MEI",
            "MERCY",
            "MOIRA",
            "ORISA",
            "PHARAH",
            "REAPER",
            "REINHARDT",
            "ROADHOG",
            "SOLDIER 76",
            "SOMBRA",
            "SYMMETRA",
            "TORBJORN",
            "TRACER",
            "WIDOWMAKER",
            "WINSTON",
            "WRECKING BALL",
            "ZARYA",
            "ZENYATTA"
        ]
    },
    "game2Words": {
        "keyValue" : [
            "TEST",
            "LUKE",
            "R2D2"
        ]
    }
}



// Capture Keyboard event when playMode is on...
document.onkeyup = function (e) {
    if (playMode) {
        guessLetter(e.key);
    }
}

// guessLetter will compare a user's guess to the gameWord.
function guessLetter (letter) {
    
    // Check if the letter is in the gameWord array...
    if (gameWord.includes(letter.toUpperCase()) == true) {
        // If the user guessed a letter in our Game Word, update the Game State
        for (var j=0; j < gameWord.length; j++) {
            if (gameWord[j] === letter.toUpperCase()) {
                answeredArray[j] = letter.toUpperCase();
                // Decrement remainingLetters
                remainingLetters--;
            }
        }
    } else {
        fillWrongLettersArray(letter);
        decrementRemainingGuess();
    }
    
    // Refresh Screen...
    gameWordText.textContent = answeredArray.join(" ");

    // If User guessed the final missing letter, congratulate them...
    if (remainingLetters === 0) {
        alert("Congrats! You have won the game");
        resetGame(true);
    }
}

// Create Function to push a letter into an array and update UI....
function fillWrongLettersArray (letter) {
    // append letter to guessWrongLetters array...
    guessWrongLetters.unshift(letter);
    // Update the UI...
    letterGuessText.textContent = guessWrongLetters.toString();
}

// Create function to decrement the remaining guesses integer
function decrementRemainingGuess () {
    iRemainingGuesses--;
    remainingGuessesText.textContent = ("Remaining Guesses: " + iRemainingGuesses);

    if (iRemainingGuesses == 0) {
        // Alert user of their misfortune
        alert("You have lost!");
        resetGame(false);
    }
}

function resetGame (bWin) {
    // 1. Update Score (bWin = True means increase iWins, else iLosses)
    updateScore(bWin);
    
    // 2. Reset Game Global Variables...
    answeredArray = [];
    guessWrongLetters = [];
    
    // 3. Pick New Game Word...
    gameWord = wordPicker(1);

    // 4. Refresh Remaining Guesses UI
    iRemainingGuesses = iTotalGuesses;
    remainingGuessesText.textContent = ("Remaining Guesses: " + iRemainingGuesses);

    // 5. Refresh guessWrongLetters UI
    letterGuessText.textContent = guessWrongLetters.toString();
}

// resetGameBoard - will cancel out the entire game...
function resetGameBoard () {
    answeredArray = [];
    guessWrongLetters = [];
    iRemainingGuesses = iTotalGuesses;
    letterGuessText.textContent = guessWrongLetters.toString();
    resetScore();
    playMode = false;
}

// Display Card Deck - When arg is true, then user clicked the play button. So disable Play btn, display the game board, & enable the Cancel btn. Else do the opposite...
function DisplayCardDeck (arg) {
    if (arg === true) {
        gameBoard.style.display = "flex";
        gameCancelBtn.disabled = false;
        document.getElementById("game-play-btn").disabled = true;
        
        remainingGuessesText.textContent = ("Remaining Guesses: " + iTotalGuesses);
        
        // Set playMode flag...
        playMode = true;
        
        // Automatically pick game word, and display placeholder values, with length = to game word...
        gameWord = wordPicker(1);  // ToDo: find a way to give the user a choice of which game version they play...
    } else {
        gameBoard.style.display = "none";
        gameCancelBtn.disabled = true;
        document.getElementById("game-play-btn").disabled = false;
        // when user cancels the game, reset the scoreboard...
        resetGameBoard();
        // resetScore();
        // playMode = false;
    }

    // initialize the Scoreboard...
    displayScore();
}

// DisplayScore - Refreshes the Scoreboard...
function displayScore () {
    xWinCounter.textContent  = iWins;
    xLossCounter.textContent = iLosses;
}

// updateScore - Function will increment/decrement either the iWins/iLosses global variable based on the value of arg
function updateScore (bWin) {
    if (bWin) {
        iWins++;
    } else {
        iLosses++;
    }

    // Update Scoreboard on UI...
    displayScore();
}

// resetScore - Sets Scoreboard back to 0 on UI
function resetScore () {
    iWins   = 0;
    iLosses = 0;
}

// resetGame - Wrapper function to Reset all variables...

// wordPicker - randomly selects a word. xGameVersion will determine what type of word we should get...
// To Do: work on this. as games grow, so does this block. Should be a cleaner way to do this. Maybe a function?
function wordPicker (xGameVersion) {
    // Pick a random number constrained by length of  game versions' word array and then stash the key val and display the hidden val...
    if (xGameVersion === 1) {
        var iIndex = Math.floor(Math.random() * words.game1Words.keyValue.length);
        var xGameKeyVal     = words.game1Words.keyValue[iIndex];
    } else if (xGameVersion === 2) {
        var iIndex = Math.floor(Math.random() * words.game2Words.keyValue.length);
        var xGameKeyVal     = words.game2Words.keyValue[iIndex];
    } else {
        var iIndex = Math.floor(Math.random() * words.game1Words.keyValue.length);
        var xGameKeyVal     = words.game1Words.keyValue[iIndex];
    }
    
    // console.log(xGameKeyVal);
    // Create the answerArray, which holds placeholders for the game word letters...
    for (var i=0; i < xGameKeyVal.length; i++) {
        answeredArray[i] = "_";
    }
    // Use the array.join to print answerArray values, with spaces...
    gameWordText.textContent = answeredArray.join(" ");
    remainingLetters = xGameKeyVal.length;
    return xGameKeyVal;
}