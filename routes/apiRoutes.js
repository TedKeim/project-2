const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // Trivia App
  router.get('/triviaGame', AppController.getExamples);
  router.post('/triviaGame', AppController.createExample);
  router.delete('/triviaGame/:id', AppController.deleteExample);

  // Hangman App
  router.get('/hangman', AppController.getExamples);
  router.post('/hangman', AppController.createExample);
  router.delete('/hangman/:id', AppController.deleteExample);

  // App
  router.get('/examples', AppController.getExamples);
  router.post('/examples', AppController.createExample);
  router.delete('/examples/:id', AppController.deleteExample);

  return router;
};
