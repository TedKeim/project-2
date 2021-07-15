const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const button2 = document.querySelector("#restartbtn")

let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
window.onload = sendApiRequest;
async function sendApiRequest() {
  const response = await fetch(
    'https://opentdb.com/api.php?amount=50&category=21&type=multiple'
  );
  console.log(response);
  const data = await response.json();
  console.log(data);
  useApiData(data);
}
function useApiData(data) {
  console.log('data:', data);
  questions = data.results.map((data) => {
    const formattedQuestion = {
      question: data.question
    };
    const answerChoices = [...data.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
    answerChoices.splice(formattedQuestion.answer - 1, 0, data.correct_answer);
    answerChoices.forEach((choice, index) => {
      formattedQuestion['choice' + (index + 1)] = choice;
    });
    return formattedQuestion;
  });
  startGame();
}
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
    $(document).ready(function() {
    $(".modal-body").html("Your score is " + score)
    $("#myModal").modal();
    })
  }


  questionCounter++
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerHTML = currentQuestion['choice' + number];
  })

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}
  choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
      const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
      incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
      };
      if (classToApply === 'correct') {
        incrementScore(CORRECT_BONUS);
      }
      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

document.getElementsByClassName('.restartbtn').addEventListener("click", restart())
function restart() {
  function startGame() {
    return;
  }
  startGame();
}



 
 
