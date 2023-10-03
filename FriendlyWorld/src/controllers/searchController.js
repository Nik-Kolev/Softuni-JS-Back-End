const errorHandler = require('../utils/errorHandler')
const petServices = require('../services/petServices')
const searchController = require('express').Router()

searchController.get('/search', (req, res) => {
    res.render('search', { title: 'Search' })
})

searchController.post('/search', async (req, res) => {
    let { searchInput } = req.body
    try {
        const pets = await petServices.getPetsBySearchParams(searchInput)
        res.render('search', { title: 'Search', pets, searchInput })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('search', { title: 'Search', errors })
    }
})

module.exports = searchController