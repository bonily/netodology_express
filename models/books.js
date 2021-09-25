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
const createNewBook = (title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '', fileBook = {}, id = uuid()) => {
 return {
   id, title, description, authors, favorite, fileCover, fileName, fileBook,
 }
};

module.exports = createNewBook;