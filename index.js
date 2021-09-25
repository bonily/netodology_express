const express = require('express');
const booksRouter  = require('./routes/books.js');
const userRouter  = require ('./routes/user.js');

const API_BOOKS = '/api/books';
const API_USER = '/api/user';

const app = express();

app.use(API_USER, userRouter);
app.use(API_BOOKS, booksRouter);


app.listen(3000);