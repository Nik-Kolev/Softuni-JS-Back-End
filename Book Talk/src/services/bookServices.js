const Book = require("../models/Book");

module.exports.createBook = (bookData) => Book.create(bookData)

module.exports.getAllBooks = () => Book.find()