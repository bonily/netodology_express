const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');

const createNewBook = require('../models/books.js');

const store = {
  books: [createNewBook(), createNewBook()],
};
const {books} = store;

const badRequest = (res) => {
    res.status = 404;
    res.redirect('/404');
    return res;
};

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Список книг',
    books,
  })
});

router.get('/create', (req, res) => {
  res.render("books/create", {
      title: "Добавить новую книгу",
  });
});

router.get('/update/:id', (req, res) => {
  const {id} = req.params;

  const currentBookIndex = books.findIndex(book => book.id === id);
  const currentBook = books[currentBookIndex];
  res.render("books/update", {
      title: "Изменить книгу",
      book: currentBook
  });
});


router.post('/create', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const newBook = createNewBook(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    res.redirect('/books');
});

router.post('/update/:id', (req, res) => {
  const {id} = req.params;
  const currentBookIndex = books.findIndex(book => book.id === id);
  const currentBook = books[currentBookIndex];
  const {title, description, authors, favorite, fileCover, fileName} = req.body;

    if (currentBookIndex > -1) {
      const updatedBook = {
        ...currentBook,
            title, description, authors, favorite, fileCover, fileName
      };
  
      books[currentBookIndex] = updatedBook;
    res.redirect('/books');
    }
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  const currentBook = books.find(book => book.id === id);

  currentBook ? res.render('books/view', {
    title: `Книга ${currentBook.title}`,
    book: currentBook,
  }) :
  badRequest(res);

});


router.post('/delete/:id', (req, res) => {
  const {id} = req.params;
  const currentBookIndex = books.findIndex(book => book.id === id);

  if (currentBookIndex > -1) {
    books.splice(currentBookIndex, 1);
    res.redirect('/books');
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