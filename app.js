const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];

// app configuration
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
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
  res.render('hello', {username: req.cookies.username});
});

app.post('/hello', (req, res) => {
  const username = req.body.username;

  res.cookie('username', username);
  res.render('hello', { username: username} );
});


app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});