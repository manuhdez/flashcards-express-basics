const express = require('express');
const router = express.Router();

// Cards Routes
router.get('/', (req, res) => {
  res.render('cards', { propmt: 'Who is buried in grants tomb?'});
});

module.exports = router;