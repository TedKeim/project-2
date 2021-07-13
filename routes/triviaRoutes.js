const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
const availableQuestions = [];

const questions = [];

request.get({
  url: 'https://opentdb.com/api.php?amount=50&category=21&type=multiple'
}, function (error, response, body) {
  if (error) return console.error('Request failed:', error);
  else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body);
})
console.log('HELOOOOOO')
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
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
      return formattedQuestion;
    });
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove('hidden');
};
getNewQuestion = () => {
  if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
    return window.location.assign('/Leaderboard');
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.Floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerHTML = currentQuestion['choice' + number];
  })
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;
  

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    
    const classToApply =
    selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    incrementScore = (num) => {
      score += num;
      scoreText.innerText = score;
      console.log('HELOOOOOO')
    }
    
    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  })};