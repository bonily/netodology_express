const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const booksRouter  = require('./src/views/routes/books.js');
const booksApiRouter  = require('./src/views/routes/api/books.js');
const userRouter  = require ('./src/views/routes/user.js');
const indexRouter  = require ('./src/views/routes/index.js');

const BOOKS='/books';
const API_BOOKS = `/api${BOOKS}`;
const API_USER = '/api/user';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', './src/views');
app.set("view engine", "ejs");

app.use('', indexRouter)
app.use(API_USER, userRouter);
app.use(BOOKS, booksRouter);
app.use(API_BOOKS, booksApiRouter);




const PORT = process.env.PORT || 3000;

const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password';
const NameDB = process.env.DB_NAME || 'books_database'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'



async function start() {
  try {
      
      await mongoose.connect(HostDb, {
          user: UserDB,
          pass: PasswordDB,
          dbName: NameDB,
          useNewUrlParser: true,
          useUnifiedTopology: true
      });

      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      })
  } catch (e) {
      console.log(e);
  }
}

start();
