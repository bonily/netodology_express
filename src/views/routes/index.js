const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/books/')
});

router.get('/404', (req, res) => {
  res.render('error/404', {
    title: '404 | Страница не найдена'
  })
});



module.exports = router;