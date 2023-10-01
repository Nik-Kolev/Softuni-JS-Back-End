const errorHandler = require('../utils/errorHandler')

const petController = require('express').Router()

petController.get('/add-animal', (req, res) => {
    res.render('pets/create', { title: 'Add Animal' })
})

petController.post('/add-animal', async (req, res) => {
    const { name, years, kind, imageUrl, needs, location, description } = req.body
    try {
        console.log('asd')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/create', { title: 'Add Animal', errors })
    }
})

module.exports = petController