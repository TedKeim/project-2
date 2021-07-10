var guessInput = document.getElementById("guessInput")
var strikes = 0
var Olympic_games = [
    'Swimming',
    'Basketball',
    'Gymnastics',
    'Weight Lifting',
    'Javelin Throw'
]

let wrong =document.querySelector("#wrong")
var originalMessage = wrong.innerHTML

var sampleFromDB = [
    {
        game: "swimming",
        date_created: 123,
        user: "John Johnson"
    }
]
var randomGameChoice = Olympic_games[Math.floor(Math.random() * Olympic_games.length)]

var result = ""
for (i = 0; i < randomGameChoice.length; i++) {
    if (randomGameChoice[i] == " ") {
        result += " "
    } else {
        result += "*"
    }
}

document.querySelector("#hangmanPlay").textContent = result;

function manageGuess() {
    if(randomGameChoice.toLowerCase().includes(guessInput.value.toLowerCase())){
        for(j=0; j<randomGameChoice.length; j++){
            // console.log(randomGameChoice[j])
            if (guessInput.value.toLowerCase() == randomGameChoice[j].toLowerCase()) {
                result = result.substring(0, j) + randomGameChoice[j] + result.substring(j+1)
                console.log("there's a match", result)
            }
        }
        checkIfWon()
        document.querySelector("#hangmanPlay").textContent = result;
    }else{
        wrong.innerHTML += "Sorry! No letter exists in the word. Try again"
        setTimeout(function() {
        wrong.innerHTML = originalMessage
  }, 2500)

        console.log("nothing matched")
        strikes++;
        if(strikes == 5) {
            alert("game over man")
        }
    }
}

function checkIfWon() {
    if(result.includes("*")){
        //game is not over
    }else {
        alert("congrats!")
    }
}

document.querySelector("#guessBtn").addEventListener("click", manageGuess)

console.log(randomGameChoice)
console.log(result)