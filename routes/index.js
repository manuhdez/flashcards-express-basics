const express = require('express');
const router = express.Router();

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

module.exports = router;