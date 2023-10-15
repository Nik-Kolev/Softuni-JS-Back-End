const errorHandler = require('../utils/errorHandler')
const bookServices = require('../services/bookServices')
const bookController = require('express').Router()

bookController.get('/catalog', async (req, res) => {
    try {
        const books = await bookServices.getAllBooks().lean()
        res.render('catalog', { title: 'Catalog', books })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('catalog', { title: 'Catalog', errors })
    }
})

bookController.get('/create', (req, res) => {
    res.render('books/create', { title: 'Create Book' })
})

bookController.post('/create', async (req, res) => {
    const { author, genre, stars, imageUrl, review } = req.body
    const bookTitle = req.body.title
    try {
        await bookServices.createBook({ bookTitle, author, genre, stars, imageUrl, review, owner: req['user']._id })
        res.redirect('/catalog')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('books/create', { title: 'Create Book', errors, bookTitle, author, genre, stars, imageUrl, review })
    }
})

bookController.get('/details/:id', async (req, res) => {
    const userId = req.user?._id
    const bookId = req.params.id
    try {
        const book = await bookServices.getSingleBookById(bookId).lean()
        let isOwner = userId == book.owner._id
        let canWishForTheBook = book.wishingList.filter(x => x == req.user?._id).length > 0 ? false : true
        res.render('books/details', { title: 'Book Details', ...book, isOwner, canWishForTheBook })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('books/details', { title: 'Book Details', errors })
    }
})

bookController.get('/wish/:id', async (req, res) => {
    const userId = req.user?._id
    const bookId = req.params.id
    try {
        await bookServices.wishForTheBook(bookId, userId)
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('books/details', { title: 'Book Details', errors })
    }
})

bookController.get('/delete/:id', async (req, res) => {
    try {
        await bookServices.deleteSingleBookById(req.params.id);
        res.redirect('/catalog');
    } catch (err) {
        const errors = errorHandler(err)
        res.render('books/details', { title: 'Book Details', errors })
    }
})

bookController.get('/edit/:id', async (req, res) => {
    try {
        const book = await bookServices.getSingleBookById(req.params.id).lean()
        res.render('books/edit', { title: 'Book Edit', ...book })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('books/edit', { title: 'Book Edit', errors })
    }
})

bookController.post('/edit/:id', async (req, res) => {
    const { author, genre, stars, imageUrl, review } = req.body
    const bookTitle = req.body.title
    const bookId = req.params.id
    try {
        await bookServices.editSingleBookById(bookId, { bookTitle, author, genre, stars, imageUrl, review })
        res.redirect(`/details/${bookId}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('books/edit', { title: 'Book Edit', errors })
    }
})
module.exports = bookController