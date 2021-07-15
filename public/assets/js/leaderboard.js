const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join('');

// // Get references to page elements
// const $userScore = $('#user-score');
// const $user = $('#user');
// const $scoreList = $('#score-list');

// // The API object contains methods for each kind of request we'll make
// const API = {
//   getHangmanScores: function () {
//     return $.ajax({
//       url: 'api/hangman',
//       type: 'GET'
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// // const refreshHangmanScores = function () {
// API.getHangmanScores().then(function (data) {
//   const $scores = data.map(function (score) {
//     const $span = $('<span>').text($userScore.text);
//     // .attr('href', '/example/' + example.id);

//     const $li = $('<li>')
//       .attr({
//         class: 'list-group-item',
//         'data-id': $userScore.id
//       })
//       .append($span);

//     return $li;
//   });

//   $scoreList.empty();
//   $scoreList.append($scores);
// });
// // };
