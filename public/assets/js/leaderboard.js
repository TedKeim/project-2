const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join('');

// The API object contains methods for each kind of request we'll make
const API = {
  getLeaderboards: function () {
    return $.ajax({
      url: 'api/leaderboards',
      type: 'GET'
    });
  }
};
