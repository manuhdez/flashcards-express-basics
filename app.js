const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// ******* app configuration **********
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// ****** Routes *********
const mainRoutes = require('./routes');
const cardsRoutes = require('./routes/cards');
app.use(mainRoutes);
app.use('/cards', cardsRoutes);

// ********* 404 handler ************
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