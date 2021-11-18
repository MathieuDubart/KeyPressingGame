//setting variables for number of times keys were pressed
let nbPlayerOnePressedKey = 0
let nbPlayerTwoPressedKey = 0

//getting elements in DOM for players scores
const scorePlayer1 = document.getElementById('scorePlayerOne')
const scorePlayer2 = document.getElementById('scorePlayerTwo')
//getting elements for players gauges
const whiteGauge1 = document.getElementById('whiteGauge1')
const whiteGauge2 = document.getElementById('whiteGauge2')
//getting elements in order to display text in this div
const whoIsWinningText = document.getElementById('whoIsWinning')
//getting elements in order to makes images clickables
const replayButtonSVG = document.querySelector("#pageContainer > #replayButton > #replayButtonImg")
const darkmodeButtonSVG = document.querySelector("#pageContainer > #darkmodeButton > #darkmodeButtonImg")
//setting a boolean for darkmode
let darkmodeIsOn = false

//getting body element for darkmode
const body = document.body

//display a textbox asking for players' names (default names are "Player 1 and Player 2")
let tempPlayerOneName = "Player1"
let tempPlayerTwoName = "Player 2"
tempPlayerOneName =  prompt("Enter Player 1's name")
tempPlayerTwoName = prompt("Enter Player 2's name")

//display names w/ an Upper Case on first letter
let firstLetterP1 = tempPlayerOneName.charAt(0)
let firstletterP2 = tempPlayerTwoName.charAt(0)

//display the remainder of names lower cases
let playerOneName = firstLetterP1.toUpperCase()+tempPlayerOneName.slice(1).toLocaleLowerCase()
let playerTwoName = firstletterP2.toUpperCase()+tempPlayerTwoName.slice(1).toLocaleLowerCase()

//display names inside the HTML
const nameOfPlayerOne = document.querySelector("#pageContainer > #playerOne > .playerName > .chosenName")
nameOfPlayerOne.innerHTML = playerOneName
const nameOfPlayerTwo = document.querySelector("#pageContainer > #playerTwo > .playerName > .chosenName")
nameOfPlayerTwo.innerHTML = playerTwoName

//function that check if player one or two has pressed his key 100 times then display the name of the player who won + "has won"
//also removing the eventListener used to check pressed keys
checkIfOver = function(){
    if (nbPlayerOnePressedKey === 100 ||nbPlayerTwoPressedKey === 100) {
        window.removeEventListener("keyup", pressedKey)
        if (nbPlayerOnePressedKey > nbPlayerTwoPressedKey) {
            whoIsWinningText.innerHTML = playerOneName + " has won !"
        }else if (nbPlayerTwoPressedKey > nbPlayerOnePressedKey) {
            whoIsWinningText.innerHTML = playerTwoName + " has won !"
        }
    }
}

//function that check which player has pressed his key more than other and displaying a message.
checkWhoIsWinning = function(){
    if (nbPlayerOnePressedKey > nbPlayerTwoPressedKey) {
        whoIsWinningText.innerHTML = playerOneName + " is winning, hurry up " + playerTwoName +" !"
    }else if (nbPlayerTwoPressedKey > nbPlayerOnePressedKey) {
        whoIsWinningText.innerHTML = playerTwoName + " is winning, hurry up " + playerOneName +" !"
    }
}

//callBack function with attributed keys (S key for P1 and L key for P2), making the right gauge reducing,
//also displaying players scores + checking who's winning and is game finished ? -> at each pressure
const pressedKey= (event) => {
    if (event.key === "s") {
        nbPlayerOnePressedKey ++
        whiteGauge1.style.height = 100 - nbPlayerOnePressedKey + "%";
        if (whiteGauge1.style.borderRadius !== "0px") {
            whiteGauge1.style.borderBottomLeftRadius = 5 - nbPlayerOnePressedKey + "px"
            whiteGauge1.style.borderBottomRightRadius = 5 - nbPlayerOnePressedKey + "px"
        }
        scorePlayer1.innerHTML = nbPlayerOnePressedKey
        checkWhoIsWinning()
        checkIfOver()
    } else if (event.key === "l") {
        nbPlayerTwoPressedKey ++
        whiteGauge2.style.height = 100 - nbPlayerTwoPressedKey + "%";
        if (whiteGauge2.style.borderRadius !== "0px") {
            whiteGauge2.style.borderBottomLeftRadius = 5 - nbPlayerTwoPressedKey + "px"
            whiteGauge2.style.borderBottomRightRadius = 5 - nbPlayerTwoPressedKey + "px"
        }
        scorePlayer2.innerHTML = nbPlayerTwoPressedKey
        checkWhoIsWinning()
        checkIfOver()
    }
}

//eventListener to check if keys are pressed + callBack function defined above
window.addEventListener("keyup", pressedKey)

//callBack function that resets variables and parameters, except players names, when refresh image is clicked
const pressedReplayButton = (event) => {
    nbPlayerOnePressedKey = 0
    nbPlayerTwoPressedKey = 0

    whiteGauge1.style.height = 100 - nbPlayerOnePressedKey + "%";
    scorePlayer1.innerHTML = nbPlayerOnePressedKey
    whiteGauge2.style.height = 100 - nbPlayerTwoPressedKey + "%";
    scorePlayer2.innerHTML = nbPlayerTwoPressedKey
    whoIsWinningText.innerHTML = ""
    whiteGauge1.style.borderBottomLeftRadius = "5px"
    whiteGauge1.style.borderBottomRightRadius = "5px"
    whiteGauge2.style.borderBottomLeftRadius = "5px"
    whiteGauge2.style.borderBottomRightRadius = "5px"
    
    //re-adding the eventListener used to check pressed keys
    window.addEventListener("keyup", pressedKey)
}

//callBack function that define if darkmode is on or off using a boolean + changing image to match the current mode
const pressedDarkmodeButton = (event) => {
    body.classList.toggle("dark-mode")
    if (darkmodeIsOn === false) {
        replayButtonSVG.src="img/refresh_white.svg"
        darkmodeButtonSVG.src="img/dark_mode_white.svg"
        darkmodeIsOn = true
    } else if (darkmodeIsOn === true){
        replayButtonSVG.src="img/refresh_black.svg"
        darkmodeButtonSVG.src="img/dark_mode_black.svg"
        darkmodeIsOn = false
    }
}

//eventsListeners for replay button and darkmode button + callBack functions defined above
replayButtonSVG.addEventListener("click", pressedReplayButton)
darkmodeButtonSVG.addEventListener("click", pressedDarkmodeButton)
