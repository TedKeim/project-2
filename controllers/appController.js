module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      db.Example.findAll({
        where: { UserId: req.session.passport.user.id }
      }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Create a new example
    createExample: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (
        dbExample
      ) {
        res.json(dbExample);
      });
    },
    // Get all Leaderboard Scores
    getLeaderboards: function (req, res) {
      // console.log('GET HEEEEERRRRREE!!!!!!');
      db.Leaderboard.findAll({
        where: { UserId: req.session.passport.user.id }
      }).then(function (dbLeaderboard) {
        // console.log('req.body:', req.body);
        // console.log('DB Leaderboard:', dbLeaderboard);
        res.json(dbLeaderboard);
      });
    },
    // Get all Hangman Scores
    getHangmanScores: function (req, res) {
      // console.log('GET HEEEEERRRRREE!!!!!!');
      db.Leaderboard.findAll({
        where: { game: 'hangman' }
      }).then(function (dbLeaderboard) {
        // console.log('req.body:', req.body);
        // console.log('DB Leaderboard:', dbLeaderboard);
        res.json(dbLeaderboard);
      });
    },
    // Create a new Hangman score
    createHangmanScore: function (req, res) {
      // console.log('HEEEEERRRRREE!!!!!!');
      db.Leaderboard.create(req.body).then(function (dbLeaderboard) {
        // console.log('req.body:', req.body);
        // console.log('DB Leaderboard:', dbLeaderboard);
        res.json(dbLeaderboard);
      });
    }
  };
};
