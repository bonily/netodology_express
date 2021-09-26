const express = require('express');
const bodyParser = require("body-parser");
const booksRouter  = require('./routes/books.js');
const booksApiRouter  = require('./routes/api/books.js');
const userRouter  = require ('./routes/user.js');
const indexRouter  = require ('./routes/index.js');

const BOOKS='/books';
const API_BOOKS = `/api${BOOKS}`;
const API_USER = '/api/user';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', indexRouter)
app.use(API_USER, userRouter);
app.use(BOOKS, booksRouter);
app.use(API_BOOKS, booksApiRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});