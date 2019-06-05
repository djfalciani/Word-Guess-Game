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
var guessWrongLetters = [];
var favTVshows = [];
var tvShow;

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
        ], 

        "displayVal" : [
            "- - -",
            "- - - -",
            "- - - - - - - -",
            "- - - - - - -",
            "- - - - - - - -",
            "- - -",
            "- - - - - - - -",
            "- - - - -",
            "- - - - -",
            "- - - - - - -",
            "- - - - -",
            "- - - - - -",
            "- - -",
            "- - - - -",
            "- - - - -",
            "- - - - -",
            "- - - - - -",
            "- - - - - -",
            "- - - - - - - - -",
            "- - - - - - -",
            "- - - - - - -  --",
            "- - - - - -",
            "- - - - - - - -",
            "- - - - - - - -",
            "- - - - - -",
            "- - - - - - - - - -",
            "- - - - - - -",
            "- - - - - - - -   - - - -",
            "- - - - -",
            "- - - - - - - -"
        ]
    },

    "game2Words": {
        "keyValue" : [
            "TEST",
            "LUKE",
            "R2D2"
        ],

        "displayVal" : [
            "- - - -",
            "- - - -",
            "- - - -"
        ]
    }
}



// Capture Keyboard event when playMode is on...
document.onkeyup = function (e) {
    if (playMode) {
        // console.log(e.key);
        guessLetter(e.key);
    }
}

// guessLetter will compare a user's guess to the gameWord.
// 1. If users' guess matches an 'unguessed' letter from the game word, then replace the token '-' with the letter
// 2. If users' guess doesn't match then push their guess into the guessWrongLetters array, and decrement the remaining guess...
// 3. If users' guess matches a value already within guessWrongLetter array, display an alert and do nothing else...
function guessLetter (letter) {
    console.log(letter);

    // var S = "fullweb";
    // S.includes("web");
    fillWrongLettersArray(letter);

}

// Create Function to push a letter into an array and update UI....
function fillWrongLettersArray (letter) {
    // append letter to guessWrongLetters array...
    guessWrongLetters.unshift(letter);
    // Update the UI...
    console.log(guessWrongLetters);
    // Print array to screen...
    letterGuessText.textContent = guessWrongLetters.toString();
}

// Create function to decrement the remaining guesses integer
function decrementRemainingGuess () {
    iRemainingGuesses--;
    remainingGuessesText.textContent = ("Remaining Guesses: " + iRemainingGuesses);

    //If RemainingGuesses = 0 then user has lost the game...
    // 1. Alert user of their misfortune
    // 2. Create/Call a Reset gameBoard Function 
    //  a) pick new gameWord b) reset the Guess Tracker card...
    // 3. Call updateScore passing false...
}

// Display Card Deck
// When arg is true, then user clicked the play button. So disable Play btn, display the game board, & enable the Cancel btn. Else do the opposite...
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
        resetScore();
        playMode = false;
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

// resetGameBoard - 

// resetGame - Wrapper function to Reset all variables...

// wordPicker - randomly selects a word. xGameVersion will determine what type of word we should get...
function wordPicker (xGameVersion) {
    // To Do: work on this. as games grow, so does this block. Should be a cleaner way to do this. Maybe a function?


    // Pick a random number constrained by length of  game versions' word array and then stash the key val and display the hidden val...
    if (xGameVersion === 1) {
        var iIndex = Math.floor(Math.random() * words.game1Words.keyValue.length);
        var xGameKeyVal     = words.game1Words.keyValue[iIndex];
        var xGameDisplayVal = words.game1Words.displayVal[iIndex];
    } else if (xGameVersion === 2) {
        var iIndex = Math.floor(Math.random() * words.game2Words.keyValue.length);
        var xGameKeyVal     = words.game2Words.keyValue[iIndex];
        var xGameDisplayVal = words.game2Words.displayVal[iIndex];
    } else {
        var iIndex = Math.floor(Math.random() * words.game1Words.keyValue.length);
        var xGameKeyVal     = words.game1Words.keyValue[iIndex];
        var xGameDisplayVal = words.game1Words.displayVal[iIndex];
    }
    
    gameWordText.textContent = xGameDisplayVal;
    console.log(xGameKeyVal);
    return xGameKeyVal;
}