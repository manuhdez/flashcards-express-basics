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
  if (side === 'answer') hint = null;

  const templateData = { text, hint };

  res.render('cards', templateData);
});

module.exports = router;