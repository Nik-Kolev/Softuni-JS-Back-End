const Book = require("../models/Book");

module.exports.createBook = (bookData) => Book.create(bookData)

module.exports.getAllBooks = () => Book.find()

module.exports.getSingleBookById = (bookId) => Book.findOne({ _id: bookId }).populate('owner')

module.exports.wishForTheBook = (bookId, userId) => Book.findOneAndUpdate({ _id: bookId, $push: { wishingList: userId }, new: true })