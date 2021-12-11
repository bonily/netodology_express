
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'books/img')
  },
  filename(req, file, cb) {
    cb(null, `book-${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
});

module.exports = multer({
  storage
});