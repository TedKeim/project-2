/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable semi */

// window.onload = sendApiRequest;

// async function sendApiRequest () {
//   const response = await fetch('https://opentdb.com/api.php?amount=50&category=21&type=multiple');
//   console.log(response);
//   const data = await response.json();
//   console.log(data);
//   useApiData(data);
// }

// function useApiData (data) {
//   document.querySelector('#question').innerHTML = `Question: ${data.results[0].question}`;
//   document.querySelector('#choice-text').innerHTML = data.results[0].correct_answer;
//   document.querySelector('#answer2').innerHTML = data.results[0].incorrect_answers[0];
//   document.querySelector('#answer3').innerHTML = data.results[0].incorrect_answers[1];
//   document.querySelector('#answer4').innerHTML = data.results[0].incorrect_answers[2];
// }

// const correctButton = document.querySelector('#answer1');

// correctButton.addEventListener('click', () => {
//   alert('Correct!');
//   sendApiRequest();
// });

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const currentQuestion = {};

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
fetch(
  'https://opentdb.com/api.php?amount=50&category=21&type=multiple'
)
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      answerChoices.splice(formattedQuestion.answer - 1, 0,
        loadedQuestion.correct_answer);
      answerChoices.forEach((choice, index) => {
        formattedQuestion['choice' + (index + 1)] = choice;
      });
    });
    return formattedQuestion;
  });
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/Leaderboard');
  }
};
questionCounter++;
progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
const questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
question.innerHTML = currentQuestion.question;
choices.forEach((choice) => {
  const number = choice.dataset['number'];
  choice.innerHTML = currentQuestion['choice' + number];
});
availableQuestions.splice(questionIndex, 1);
acceptingAnswers = true;
choices.forEach(choice => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    const classToApply =

      // eslint-disable-next-line eqeqeq
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    incrementScore = (num) => {
      score += num;
      scoreText.innerText = score;
    }
    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  })
});
startGame();