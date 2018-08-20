const express = require('express');
const router = express.Router();
const firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAMXFB2-f91eOJ7TcCmJb56foCr6IEc8i0",
  authDomain: "flashcards-node.firebaseapp.com",
  databaseURL: "https://flashcards-node.firebaseio.com",
  projectId: "flashcards-node",
  storageBucket: "flashcards-node.appspot.com",
  messagingSenderId: "816221392665"
};
firebase.initializeApp(config);

// Database
const database = firebase.database();
const { data } = require('../data/flashcardData.json');
const { cards } = data;



// Cards Routes
router.get('/', (req, res) => {
  let cardsData = [];
  database.ref('/data/cards').once('value').then( snapshot => cardsData.push(snapshot.val()));
  const randomCard = Math.floor(Math.random() * cardsData.length);
  res.redirect(`/cards/${randomCard}?side=question`);
});

router.get('/:id', (req, res) => {
  const username = req.cookies.username;
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  let { hint } = cards[id];
  let link = {};

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  if (side === 'answer') {
    hint = null;
    link.text = 'Show question';
    link.url = `/cards/${id}?side=question`;
  } else if (side === 'question'){
    link.text = 'Show answer';
    link.url = `/cards/${id}?side=answer`;
  } else {

  }

  const templateData = { text, hint, link, username, side };

  res.render('cards', templateData);
});

module.exports = router;