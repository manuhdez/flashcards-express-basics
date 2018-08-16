const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

// Cards Routes
router.get('/', (req, res) => {
  const randomCard = Math.floor(Math.random() * cards.length);
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

  const templateData = { text, hint, link, username };

  res.render('cards', templateData);
});

module.exports = router;