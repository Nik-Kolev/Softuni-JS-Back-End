const searchController = require('express').Router()
const gameServices = require('../services/gameServices')
const errorHandler = require('../utils/errorHandler')
const { isAuthorized } = require('../middlewares/authMiddleware')

searchController.get('/search', isAuthorized, async (req, res) => {
    try {
        const games = await gameServices.getAllGames().lean()
        res.render('search', { title: 'Search Game', games })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('search', { title: 'Search Game', errors })
    }
})

searchController.post('/search', isAuthorized, async (req, res) => {
    const { searchInput, platform } = req.body
    try {
        const games = await gameServices.searchGames(searchInput, platform).lean()
        res.render('search', { title: 'Search Game', games })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('search', { title: 'Search Game', errors })
    }

})

module.exports = searchController