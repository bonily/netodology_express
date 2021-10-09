const { v4: uuid }  = require('uuid');


/**
* @param {string} id,
* @param {string} title,
* @param {string} desrciption,
* @param {string} authors,
* @param {string} favorite,
* @param {string} fileCover,
* @param {string} fileName
*/
const createNewBook = (title = '', desrciption = '', authors = '', favorite = '', fileCover = '', fileName = '', fileBook = {}, id = uuid()) => {
 return {
   id, title, desrciption, authors, favorite, fileCover, fileName, fileBook,
 }
};

module.exports = createNewBook;