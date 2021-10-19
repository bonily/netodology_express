const express = require('express');
const router = express.Router();
const passport = require('passport')

const User = require('../../models/users');


router.post('/login',
    passport.authenticate(
        'local'),
    (req, res) => {
      req.user ? 
      res.json(req.user) : res.json(req.flash('error'))
    }
    );


router.post('/signup', async(req, res) => {
  const {username, password} = req.body;

  const newUser = new User({
    username, password
  });
  
  
  try {
    await newUser.save();
    res.json(newUser);
  } catch(e) {
    res.json(e);
  }
});

module.exports = router;