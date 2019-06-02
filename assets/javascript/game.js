var gameBoard       = document.getElementById("gameBoard");
var gameCancelBtn   = document.getElementById("game-cancel-btn");

// Capture Keyboard event...
document.onkeyup = function (e) {
    console.log(e.key);
}

// Enabled State of Cancel Button
// function enableCancelBtn {

// }

// $("#game-cancel-btn").button('dispose')
// $().button('toggle')


// Display Card Deck
// When arg is true, then user clicked the play button. So disable Play btn, display the game board, & enable the Cancel btn. Else do the opposite...
function DisplayCardDeck (arg) {
    if (arg === true) {
        gameBoard.style.display = "flex";
        
        gameCancelBtn.disabled = false;
        document.getElementById("game-play-btn").disabled = true;
    } else {
        gameBoard.style.display = "none";
        gameCancelBtn.disabled = true;
        document.getElementById("game-play-btn").disabled = false;
    }

}