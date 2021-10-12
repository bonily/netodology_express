const express = require('express');
const router = express.Router();

const Book = require('../models/book');


const badRequest = (res) => {
    res.status = 404;
    res.redirect('/404');
    return res;
};


router.get('/', async(req, res) => {
  const books = await Book.find();
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


router.get('/update/:id', async(req, res) => {
  const {id} = req.params;

  let currentBook;

  try {
    currentBook = await Book.findById(id);
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

  const newBook = new Book({
    title, description, authors, favorite, fileCover, fileName
  });
  
  try {
    await newBook.save();
    res.redirect('/books');
  } catch(e) {
    console.error(e)
  }

});

router.post('/update/:id', async(req, res) => {
  const {id} = req.params;
  const {title, description, authors, favorite, fileCover, fileName} = req.body;

  try {
    await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName});
  } catch (e) {
      console.error(e);
      res.status(404).redirect('/404');
  }
    res.redirect('/books');
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;

  let currentBook;

  try {
    currentBook = await Book.findById(id);
  } catch (e) {
      console.error(e);
      badRequest(res);
  }

  currentBook && res.render('books/view', {
    title: `Книга ${currentBook.title}`,
    book: currentBook,
  }) 
});


router.post('/delete/:id', async(req, res) => {
  const {id} = req.params;
  console.log(id)

  try {
    await Book.deleteOne({_id: id});
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