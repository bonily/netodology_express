var inversify = require("inversify");
require("reflect-metadata");
const BookRepository  = require('../repository/book');


const express = require('express');
const router = express.Router();
const Book = require('../models/book');

inversify.decorate(inversify.injectable(), BookRepository);

const container = new inversify.Container();
container.bind(BookRepository).toSelf();



const badRequest = (res) => {
    res.status = 404;
    res.redirect('/404');
    return res;
};


router.get('/', async(req, res) => {
  const repo = container.get(BookRepository);
  const books = await repo.getBooks();
  res.render('index', {
    title: 'Список книг бла бла',
    books,
    user: req.user
  })
});

router.get('/create', (req, res) => {
  res.render("books/create", {
      title: "Добавить новую книгу",
  });
});


router.get('/update/:id', async(req, res) => {
  const {id} = req.params;
  const repo = container.get(BookRepository);
 
  let currentBook;

  try {
    currentBook = await repo.getBook(id);

  } catch (e) {
      console.error(e);
      badRequest(res);
  }
  
  res.render("books/update", {
      title: "Изменить книгу",
      book: currentBook
  });
});


router.post('/create', async(req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body;

  const repo = container.get(BookRepository);

  try {
    await repo.createBook(title, description, authors, favorite, fileCover, fileName)
    res.redirect('/books');
  } catch(e) {
    console.error(e)
  }

});

router.post('/update/:id', async(req, res) => {
  const {id} = req.params;
  const {title, description, authors, favorite, fileCover, fileName} = req.body;
  const repo = container.get(BookRepository);

  try {
    await repo.updateBook(id, title, description, authors, favorite, fileCover, fileName);
  } catch (e) {
      console.error(e);
      res.status(404).redirect('/404');
  }
    res.redirect('/books');
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const repo = container.get(BookRepository);
  let currentBook;

  try {
    currentBook = await repo.getBook(id);
  } catch (e) {
      console.error(e);
      badRequest(res);
  }

  currentBook && res.render('books/view', {
    title: `Книга ${currentBook.title}`,
    book: currentBook,
    user: req.user,
  }) 
});


router.post('/delete/:id', async(req, res) => {
  const {id} = req.params;
  const repo = container.get(BookRepository);

  try {
    await repo.deleteBook(id);
  } catch (e) {
    console.error(e);
    badRequest(res);
  }
  res.redirect('/books');
});

// router.get('/:id/download', (req, res) => {
//   const {id} = req.params;
//   const book = store.books.find(book => book.id === id);
//   const filename = book.fileBook.filename;
//   res.download(__dirname+`/../books/img/${filename}`, `${book.filename}`, err=>{
//       if (err){
//           badRequest(res)
//       }
//   });
// });

module.exports = router;