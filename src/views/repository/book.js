const Book = require('../models/book');

class BooksRepository {

  constructor() {

  }
    // findCurrentIndex(id) {
    //   return this.books.findIndex(book => book.id === id);
    // } 

    createBook(title, description, authors, favorite, fileCover, fileName) {
      const newBook = new Book({
        title, description, authors, favorite, fileCover, fileName
      });
      newBook.save();
    }

    getBook(id) { 
      return Book.findById(id);
    }

    getBooks(){
      return Book.find();
    }

    updateBook(id, title, description, authors, favorite, fileCover, fileName) {
      return Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName});
    }

    deleteBook(id) {
      return Book.deleteOne({_id: id});
    }
}

// const books = new BooksRepository([{id: '1', title: '231'} as BookType]);

module.exports = BooksRepository;