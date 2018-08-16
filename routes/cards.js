const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

// Cards Routes
router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  let { hint } = cards[id];
  let link = {};

  if (side === 'answer') {
    hint = null;
    link.text = 'Show question';
    link.url = `/cards/${id}?side=question`;
  } else {
    link.text = 'Show answer';
    link.url = `/cards/${id}?side=answer`;
  }

  const templateData = { text, hint, link };

  res.render('cards', templateData);
});

module.exports = router;