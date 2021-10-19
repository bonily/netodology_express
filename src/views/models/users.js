const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  favoriteBooks: {
    type: Array,
    required: false,
    default: []
  }
})

module.exports = model('User', userSchema);