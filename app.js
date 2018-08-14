const express = require('express');
const app = express();

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];

app.set('view engine', 'pug');

// home route
app.get('/', (req, res) => {
  res.render('index');
});

// cards route
app.get('/cards', (req, res) => {
  res.render('cards', { propmt: 'Who is buried in grants tomb?', colors});
});

// hello route
app.get('/hello', (req, res) => {
  res.render('hello');
});

app.post('/hello', (req, res) => {
  res.render('hello');
});


app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});