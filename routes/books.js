const express = require('express');
const router = express.Router();

const createNewBook = require('../models/books.js');

const store = {
  books: [createNewBook(), createNewBook()],
};
const {books} = store;

router.get('/', (req, res) => {
  res.json(books);
});

router.get(':id', (req, res) => {
  const {id} = req.params;

  const currentBook = books.find(book => book.id === id);

  const badRequest = () => {
    res.status = 404;
    res.json('404 | Страница не найдена');
  };

  currentBook ? res.json(currentBook) : badRequest();

});

router.post('', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body;

  const newBook = createNewBook(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = ''} = req.body;

  const currentBookIndex = books.findIndex(book => book.id === id);
  const currentBook = books[currentBookIndex];

  const badRequest = () => {
    res.status = 404;
    res.json('404 | Страница не найдена');
  };

  if (currentBookIndex > -1) {
    const updatedBook = {
      ...currentBook,
          title, description, authors, favorite, fileCover, fileName
    };

    books[currentBookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    badRequest();
  }

});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const currentBookIndex = books.findIndex(book => book.id === id);

  if (currentBookIndex > -1) {
    books.splice(currentBookIndex, 1);
    res.json('OK')
    } else {
    badRequest();
  }
})

module.exports = router;