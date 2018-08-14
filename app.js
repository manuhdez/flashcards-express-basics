const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('cards', { propmt: 'Who is buried in grants tomb?', hint: 'Think about whose tomb it is.'});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});