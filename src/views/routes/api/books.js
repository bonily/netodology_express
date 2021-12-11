const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../middleware/file');

const createNewBook = require('../../models/book.js');

const store = {
  books: [createNewBook(), createNewBook()],
};
const {books} = store;

const badRequest = (res) => {
  const error = {
    errCode: 404,
    errMessage: 'Страница не найдена'
  }
    res.status = 404;
    res.json(error);
    return res;
};

router.get('/', (req, res) => {
  res.json(books)
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  const currentBook = books.find(book => book.id === id);

  currentBook ? res.json(currentBook) : badRequest(res)

});

router.post('',  fileMiddleware.single('book-file'), (req, res) => {
  const {title, desrciption, authors, favorite, fileCover, fileName} = req.body;
  if (req.file) {
    const fileBook = req.file;
    const newBook = createNewBook(title, desrciption, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    res.json(newBook);
  }

  else {
    res.json(null);
}

});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {title = '', desrciption = '', authors = '', favorite = '', fileCover = '', fileName = ''} = req.body;

  const currentBookIndex = books.findIndex(book => book.id === id);
  const currentBook = books[currentBookIndex];

  if (currentBookIndex > -1) {
    const updatedBook = {
      ...currentBook,
          title, desrciption, authors, favorite, fileCover, fileName
    };

    books[currentBookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    badRequest(res);
  }

});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const currentBookIndex = books.findIndex(book => book.id === id);

  if (currentBookIndex > -1) {
    books.splice(currentBookIndex, 1);
    res.json('OK')
    } else {
    badRequest(res);
  }
});

router.get('/:id/download', (req, res) => {
  const {id} = req.params;
  const book = store.books.find(book => book.id === id);
  const filename = book.fileBook.filename;
  res.download(__dirname+`/../books/img/${filename}`, `${book.filename}`, err=>{
      if (err){
          badRequest(res)
      }
  });
});

module.exports = router;