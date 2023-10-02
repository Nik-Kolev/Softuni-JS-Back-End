const errorHandler = require('../utils/errorHandler')
const petServices = require('../services/petServices')
const petController = require('express').Router()

petController.get('/add-animal', (req, res) => {
    res.render('pets/create', { title: 'Add Animal' })
})

petController.post('/add-animal', async (req, res) => {
    const { name, years, kind, imageUrl, needs, location, description } = req.body
    try {
        let pet = await petServices.createPet({ name, years, kind, imageUrl, needs, location, description })
        res.render('pets/create', { pet, title: 'Add Animal' })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/create', { title: 'Add Animal', errors, name, years, kind, imageUrl, needs, location, description })
    }
})

module.exports = petController