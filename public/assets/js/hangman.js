const guessInput = document.getElementById('guessInput');
let strikes = 0;
const olympicGames = [
  'Swimming',
  'Basketball',
  'Gymnastics',
  'Weight Lifting',
  'Javelin Throw'
];
let initialScore = 0;
const score = document.getElementById('score');
const wrong = document.querySelector('#wrong');
const originalMessage = wrong.innerHTML;
const win = document.querySelector('#win');
const winningMessage = win.innerHTML;

const sampleFromDB = [
  {
    game: 'swimming',
    date_created: 123,
    user: 'John Johnson'
  }
];
const randomGameChoice =
  olympicGames[Math.floor(Math.random() * olympicGames.length)];

let result = '';
let i = '';
for (i = 0; i < randomGameChoice.length; i++) {
  if (randomGameChoice[i] === ' ') {
    result += ' ';
  } else {
    result += '*';
  }
}

document.querySelector('#hangmanPlay').textContent = result;

function manageGuess() {
  if (randomGameChoice.toLowerCase().includes(guessInput.value.toLowerCase())) {
    let j = '';
    for (j = 0; j < randomGameChoice.length; j++) {
      // console.log(randomGameChoice[j])
      if (
        guessInput.value.toLowerCase() === randomGameChoice[j].toLowerCase()
      ) {
        result =
          result.substring(0, j) +
          randomGameChoice[j] +
          result.substring(j + 1);
        console.log("there's a match", result);
        initialScore += 10;
        score.innerHTML = initialScore;
      }
    }
    checkIfWon();
    document.querySelector('#hangmanPlay').textContent = result;
  } else {
    wrong.innerHTML += 'Sorry! This letter exists in the word. Try again';
    setTimeout(function () {
      wrong.innerHTML = originalMessage;
    }, 2500);

    console.log('nothing matched');
    strikes++;
    document.getElementById('strikesCounter').textContent = strikes;
    console.log('strikes:', strikes);
    if (strikes === 5) {
      alert('Game Over! Please play again.');
    }
  }
}

function checkIfWon() {
  if (result.includes('*')) {
    // game is not over
  } else {
    win.innerHTML += 'Way to Go, you win! Check your final score below!';

    initialScore += 100;
    score.innerHTML = initialScore;

    const userId = document.getElementById('user').dataset.id;
    console.log('userId: ', userId);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3AxZCfJ4AKPxQp_-jBZvhQ7WrHZ9prnHBa.0lGg8Y%2BKvMQWlkwwHE0xEigxKDMjoq1rJj9XpUikp5s'
    );

    const raw = JSON.stringify({
      userId: userId,
      game: 'hangman',
      score: parseInt(score.innerHTML)
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('/api/hangman', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}

document.querySelector('#guessBtn').addEventListener('click', manageGuess);

console.log(randomGameChoice);
console.log(result);