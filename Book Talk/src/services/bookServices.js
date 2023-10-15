
const Book = require("../models/Book");

module.exports.createBook = (bookData) => Book.create(bookData)

module.exports.getAllBooks = () => Book.find()

module.exports.getSingleBookById = (bookId) => Book.findOne({ _id: bookId }).populate('owner')

module.exports.wishForTheBook = (bookId, userId) => {
    return Book.findOneAndUpdate({ _id: bookId, wishingList: { $ne: userId } }, { $push: { wishingList: userId } }, { new: true })
}

module.exports.deleteSingleBookById = (bookId) => Book.findOneAndDelete({ _id: bookId })

module.exports.editSingleBookById = (bookId, bookData) => Book.findOneAndUpdate({ _id: bookId }, bookData, { runValidators: true })

module.exports.wishBooks = (userId) => Book.find({ wishingList: userId })