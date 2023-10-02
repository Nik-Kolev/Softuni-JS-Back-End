const homeController = require('express').Router()
const petController = require('../services/petServices')
const errorHandler = require('../utils/errorHandler')

homeController.get('/', async (req, res) => {
    try {
        const pets = await petController.getAllPets()
        const sortedPets = pets.sort((a, b) => b.timestamp - a.timestamp).slice(0, 3)
        res.render('home', { title: 'Home', sortedPets })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('home', { title: 'Home', errors })
    }

})

homeController.get('/404', (req, res) => {
    res.render('404', { title: '404' })
})

module.exports = homeController