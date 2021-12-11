const express = require('express');
const store = require('./store.js');

const app = express();


app.get('/counter/:id', (req, res) => {
  const {id} = req.params;

  const count = store[id] ? store[id] : 0;
  res.json(count) 
});


app.post('/counter/:id/incr', (req, res) => {
  const {id} = req.params;
  store[id] = store[id] ? store[id] + 1 : 1;
  res.json('OK')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});