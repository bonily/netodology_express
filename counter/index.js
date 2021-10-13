const express = require('express');
const redis = require('redis');

const app = express();

const REDIS_URL = process.env.REDIS_URL;

console.log(REDIS_URL)

const client = redis.createClient(`redis://${REDIS_URL}`)


app.get('/counter/:id', (req, res) => {
  const {id} = req.params;

  client.get(id, (err, rep) => {
    if(err) {
      res.status(500).json({ error: 'Redis error'})
    } else {
      console.log(rep)
      res.json(rep) 
    }
  })
});

app.post('/counter/:id/incr', (req, res) => {
  const {id} = req.params;

  client.incr(id, (err, rep) => {
    if(err) {
      res.status(500).json({ error: 'Redis error'})
    } else {
      res.json('OK')
    }
  })

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});