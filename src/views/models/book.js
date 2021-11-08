const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    authors: {
        type: String,
        default: ''
    },
    favorite: {
        type: String,
        default: ''
    },
    fileCover: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    },
    comments: {
        type: Array,
    }
});

module.exports = model('Book', bookSchema);
