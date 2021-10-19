const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const flash = require('connect-flash');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const booksRouter  = require('./src/views/routes/books.js');
const booksApiRouter  = require('./src/views/routes/api/books.js');
const userRouter  = require ('./src/views/routes/users.js');
const userApiRouter  = require ('./src/views/routes/api/users.js');
const indexRouter  = require ('./src/views/routes/index.js');

const User = require('./src/views/models/users');


const BOOKS='/books';
const API_BOOKS = `/api${BOOKS}`;
const USER = '/user';
const API_USER = '/api/user';



const verifyPassword = ( user, password) => {
  return user.password === password
};

const verify = (username, password, done) => {
   User.findOne({username: username}, function (err, user) {
    if (err) { return done(err) }
    if(!user) { return done(null, false, {message: `Пользователь ${username} не найден`})}
    if(!verifyPassword(user, password)) {return done(null, false, {message: 'Не верный пароль'})}
  
    return done(null, user) 
   })
  }

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
}

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user._id)
});

passport.deserializeUser(async(id, cb) => {
    await User.findById(id, function (err, user) {
      if(err) return cb(err);
      return cb(null, user);
    });
  }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views',  ['./src/views', './src/views/users']);
app.set("view engine", "ejs");
app.use(flash());


app.use(require('express-session')({
    secret: process.env.COOKIE_SECRET || 'секрет-секрет',
    resave: false,
    saveUninitialized: false,
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use('', indexRouter);
app.use(USER, userRouter);
app.use(API_USER, userApiRouter);
app.use(BOOKS, booksRouter);
app.use(API_BOOKS, booksApiRouter);


const PORT = process.env.PORT || 3000;

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password';
const NameDB = process.env.DB_NAME || 'books_database'
const HostDb = process.env.DB_HOST || 'mongodb://loacalhost:27017/'



async function start() {
  try {
      
      await mongoose.connect(HostDb, {
          user: UserDB,
          pass: PasswordDB,
          dbName: NameDB,
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true
      });

      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      })
  } catch (e) {
      console.log(e);
  }
}

start();