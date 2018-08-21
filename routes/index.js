const express = require('express');
const router = express.Router();
const firebase = require('../private/firebaseinit');

// home route
router.get('/', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.render('index', { username });
  } else {
    res.redirect('/hello');
  }
});

// hello routes
router.get('/hello', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  const username = req.body.username;
  res.cookie('username', username);

  res.redirect('/');
});

// goodbye route
router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});

// new card routes
router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/new', (req, res) => {
  let question = req.body.question;
  let hint = req.body.hint;
  let answer = req.body.answer;

  function writeQuestionData(question, hint, answer) {
    firebase.database().ref('data/cards').push({
      question,
      hint,
      answer
    });
  }

  writeQuestionData(question, hint, answer);

  res.redirect('/cards');
});

router.get('/database', (req, res) => {
  res.json(req.body);
})

module.exports = router;