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
    console.log('here')
    res.render('books/create', { title: 'Create Book' })
})

bookController.post('/create', async (req, res) => {
    const { author, genre, stars, imageUrl, review } = req.body
    const bookTitle = req.body.title
    try {
        await bookServices.createBook({ bookTitle, author, genre, stars, imageUrl, review })
        res.redirect('/catalog')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('books/create', { title: 'Create Book', errors, bookTitle, author, genre, stars, imageUrl, review })
    }
})

module.exports = bookController