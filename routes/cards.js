const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

// Cards Routes
router.get('/:id', (req, res) => {
  const cardId = req.params.id;
  res.render('cards', {
    prompt: cards[cardId].question,
    hint: cards[cardId].hint
  });
});

module.exports = router;