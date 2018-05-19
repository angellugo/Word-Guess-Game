var debug = false;

var wins = 0;
var wordToGuess = "";
var numberOfGuessesRemaining = 6;
var lettersAlreadyUsed = [];
var wordWithBlanks = [];

function getWordToGuess() {
    var words = ["hacker", "Neo", "Morpheous", "Trinity", "agent", "keymaker", "dreams", "coppertop", "martial", "computer", "machines", "rabbithole"];
    var index = Math.floor(Math.random() * words.length);
    debug && console.log("words[" + index + "]", words[index]);
    return words[index];
}

function setupBlanksToGuess() {
    wordToGuess = getWordToGuess();
    var tempWord = '';
    for (var index = 0; index < wordToGuess.length; index++) {
        tempWord += "_ ";
        wordWithBlanks.push('_');
    }
    debug && console.log(wordWithBlanks.length === wordToGuess.length);
    document.querySelector("#currentWord").innerHTML = "Current Word: " + tempWord;
}

function playLetter(letter) {
    for (var index = 0; index < wordToGuess.length; index++) {
        if (wordToGuess[index].toLowerCase() === letter) {
            wordWithBlanks[index] = wordToGuess[index];
        }
    }
    var tempWord = '';
    for (var index = 0; index < wordWithBlanks.length; index++) {
        tempWord += wordWithBlanks[index] + ' ';
    }
    document.querySelector("#currentWord").innerHTML = "Current Word: " + tempWord;
}

function checkForWin() {
    if (!wordWithBlanks.includes('_')) {
        debug && alert("You've won!");
        document.querySelector("#wonLoss").innerHTML = "You've won!";
        wins++;
        renderWins();
        resetGameAfterXMiliseconds(2000);
    }
}

function checkForLoss() {
    if (numberOfGuessesRemaining < 1) {
        debug && alert("You've lost :(\nThe word was " + wordToGuess);
        document.querySelector("#wonLoss").innerHTML = "You've lost... The word was " + wordToGuess;
        resetGameAfterXMiliseconds(2000);
    }
}

function resetGameAfterXMiliseconds(miliseconds){
    setTimeout(function(){         
        numberOfGuessesRemaining = 6;
        renderNumberOfGuessesRemaining();
        lettersAlreadyUsed = [];
        renderLettersAlreadyUsed();
        wordWithBlanks = [];
        setupBlanksToGuess();
        document.querySelector("#wonLoss").innerHTML = "";      
     }, miliseconds);

}

function renderWins() {
    document.getElementById("wins").innerHTML = "Wins: " + wins;
}

function renderNumberOfGuessesRemaining() {
    document.querySelector("#guessesRemaining").innerHTML = "Number of guesses remaining: " + numberOfGuessesRemaining;

}

function renderLettersAlreadyUsed() {
    document.querySelector("#lettersUsed").innerHTML = "Letters already used: " + lettersAlreadyUsed;
}

function isALetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}



renderWins();
setupBlanksToGuess();
renderNumberOfGuessesRemaining();
renderLettersAlreadyUsed();

document.onkeyup = function (event) {
    var userInput = event.key.toLowerCase();

    if (isALetter(userInput)) { //checks only if letter typed is a letter

        if (wordToGuess.toLowerCase().includes(userInput)) {
            debug && alert("Letter included in word");
            playLetter(userInput);
            checkForWin();
        }
        else if (lettersAlreadyUsed.includes(userInput) != true) {
            debug && alert("Letter NOT included in word");
            numberOfGuessesRemaining--;
            renderNumberOfGuessesRemaining();
            lettersAlreadyUsed.push(userInput);
            renderLettersAlreadyUsed();
            checkForLoss();
        } else {
            debug && alert("Ignoring letter, already pressed");
        }
    }
}
