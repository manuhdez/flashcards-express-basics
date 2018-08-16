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

// ****** Routes *********
// home route
app.get('/', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.render('index', { username });
  } else {
    res.redirect('/hello');
  }
});

// cards route
app.get('/cards', (req, res) => {
  res.render('cards', { propmt: 'Who is buried in grants tomb?', colors});
});

// hello route
app.get('/hello', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  const username = req.body.username;
  res.cookie('username', username);

  res.redirect('/');
});

// goodbye route
app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Page not Found');
  err.status = 404;
  next(err);
})

// Error middleware
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});


app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});