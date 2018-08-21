const express = require('express');
const router = express.Router();
const firebase = require('../private/firebaseinit');

let cardsData = [];
// Get cards from database
const cardsDataPromise = new Promise( (resolve, reject) => {
  resolve(firebase.database().ref('/data/cards').once('value').then( snapshot => snapshot.val()));
});

// Cards Routes
router.get('/', (req, res) => {
  cardsDataPromise.then( (value) => {
    // store card objects inside cardsData array
    if (cardsData.length == 0) {
      Object.keys(value).forEach( val => cardsData.push(value[val]));
    }

    const randomCard = Math.floor(Math.random() * cardsData.length);
    // redirect to /:id to render the card
    res.redirect(`/cards/${randomCard}?side=question`);
  });
});

router.get('/:id', (req, res) => {

  // check if there are new questions on the database
  cardsDataPromise.then( value => {
    let valueExtracted = [];
    Object.keys(value).forEach( val => valueExtracted.push(value[val]));
    if (valueExtracted.length > cardsData.length) {
      // store the data with the new questions included
      cardsData = [];
      Object.keys(value).forEach( val => cardsData.push(value[val]));
      sendResponse();
    } else {
      sendResponse();
    }
  });

  function sendResponse() {
    // grab request data
    const username = req.cookies.username;
    const { side } = req.query;
    const { id } = req.params;
    // Initialize card variables
    let text = cardsData[id][side];
    let hint = cardsData[id]['hint'];
    let link = {};

    if (side === 'answer') {
      hint = null;
      link.text = 'Show question';
      link.url = `/cards/${id}?side=question`;
    } else if (side === 'question'){
      link.text = 'Show answer';
      link.url = `/cards/${id}?side=answer`;
    } else {
      return res.redirect(`/cards/${id}?side=question`);
    }

    const templateData = { text, hint, link, username, side };
    return res.render('cards', templateData);
  }
});

module.exports = router;