var gameBoard       = document.getElementById("gameBoard");
var gameCancelBtn   = document.getElementById("game-cancel-btn");
var xWinCounter     = document.getElementById("winCount");
var xLossCounter    = document.getElementById("lossCount");
var gameWordText    = document.getElementById("gameWord");

var iWins           = 0;
var iLosses         = 0;

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



// Capture Keyboard event...
document.onkeyup = function (e) {
    console.log(e.key);
}

// Display Card Deck
// When arg is true, then user clicked the play button. So disable Play btn, display the game board, & enable the Cancel btn. Else do the opposite...
function DisplayCardDeck (arg) {
    if (arg === true) {
        gameBoard.style.display = "flex";
        gameCancelBtn.disabled = false;
        document.getElementById("game-play-btn").disabled = true;
        
        // Automatically pick game word, and display placeholder values, with length = to game word...
        wordPicker(1);  // ToDo: find a way to give the user a choice of which game version they play...
        
    } else {
        gameBoard.style.display = "none";
        gameCancelBtn.disabled = true;
        document.getElementById("game-play-btn").disabled = false;
        // when user cancels the game, reset the scoreboard...
        resetScore();
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

function computerPicker() {
    var computerOptions = ['r', 'p', 's'];
    var computerChoice = computerOptions[Math.floor(Math.random() * 3)];
    return computerChoice;
  }