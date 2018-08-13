const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Im running!</h1>');
});

app.get('/hello', (req, res) => {
  res.send('<h1>Hello Javascript developer</h1>');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000...');
});