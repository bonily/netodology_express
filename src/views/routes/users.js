const express = require('express');
const router = express.Router();
const passport = require('passport');
const isAuth = require('../middleware/isAuth');


const User = require('../models/users');


router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Вход в систему',
    message: req.flash('error')
  })
});

router.post('/login',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/user/login',
            failureFlash: true,
        },
    ),
    (req, res) => {
        console.log("req.user: ", req.user);
        res.redirect('/');
    }
    );


router.post('/signup', async(req, res) => {
  const {username, password} = req.body;

  const newUser = new User({
    username, password
  });
  
  
  try {
    await newUser.save();
    res.redirect('/books');
  } catch(e) {
    console.error(e)
  }

});

router.get('/me', isAuth,
async(req, res) => {
  let currentUser;

  try {
    currentUser = await User.findById(req.user._id);
  } catch (e) {
      console.error(e);
      badRequest(res);
  }
  
  res.render('profile', {
    title: 'Информация о пользователе',
    user: currentUser
  })
});

router.get('/logout',
  function (req, res) {
    req.logout()
    res.redirect('/')
  });


router.post('/me', async(req, res) => {
  const {fullName, age} = req.body;

  let currentUser;

  try {
    currentUser = await User.findByIdAndUpdate(req.user._id, {fullName, age});
  } catch (e) {
      console.error(e);
      badRequest(res);
  }
  res.redirect('/');
});


module.exports = router;