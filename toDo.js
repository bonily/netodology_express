const express = require('express');
const { v4: uuid }  = require('uuid');

/**
 * @param {string} id,
 * @param {string} title,
 * @param {string} description,
 * @param {string} authors,
 * @param {string} favorite,
 * @param {string} fileCover,
 * @param {string} fileName
 */
const createNewBook = (title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', id = uuid()) => {
  return {
    id, title, description, authors, favorite, fileCover, fileName
  }
};

const store = {
  toDo: [createNewBook(), createNewBook()],
};
const {toDo} = store;
const API_BOOKS = '/api/books';

const app = express();
app.use(express.json());


app.post('/api/user/login', (req, res) => {
  res.status == 201;
  res.json({ id: 1, mail: "test@mail.ru" })
});

app.get(API_BOOKS, (req, res) => {
  res.json(toDo);
});

app.get(`${API_BOOKS}/:id`, (req, res) => {
  const {id} = req.params;

  const currentBook = toDo.find(book => book.id === id);

  const badRequest = () => {
    res.status = 404;
    res.json('404 | Страница не найдена');
  };

  currentBook ? res.json(currentBook) : badRequest();

});

app.post(API_BOOKS, (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body;

  const newBook = createNewBook(title, description, authors, favorite, fileCover, fileName);
  toDo.push(newBook);

  res.status(201);
  res.json(newBook);
});

app.put(`${API_BOOKS}/:id`, (req, res) => {
  const {id} = req.params;
  const {title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = ''} = req.body;

  const currentBookIndex = toDo.findIndex(book => book.id === id);
  const currentBook = toDo[currentBookIndex];

  const badRequest = () => {
    res.status = 404;
    res.json('404 | Страница не найдена');
  };

  if (currentBookIndex > -1) {
    const updatedBook = {
      ...currentBook,
          title, description, authors, favorite, fileCover, fileName
    };

    toDo[currentBookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    badRequest();
  }

});

app.delete(`${API_BOOKS}/:id`, (req, res) => {
  const {id} = req.params;
  const currentBookIndex = toDo.findIndex(book => book.id === id);

  if (currentBookIndex > -1) {
    toDo.splice(currentBookIndex, 1);
    res.json('OK')
    } else {
    badRequest();
  }
})


app.listen(3000);