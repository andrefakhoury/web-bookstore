const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define schema for /books
const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  qttStock: {
    type: Number,
    required: true
  },
  qttSold: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = {Book};