const gameController = require('express').Router()
const { platformOptions } = require('../config/additionalConfigInfo')
const gameServices = require('../services/gameServices')
const errorHandler = require('../utils/errorHandler')

gameController.get('/catalog', (req, res) => {
    res.render('game/catalog', { title: 'Catalog' })
})

gameController.get('/createGame', (req, res) => {
    res.render('game/create', { title: 'Create Game' })
})

gameController.post('/createGame', async (req, res) => {
    const { platform, name, imageUrl, price, genre, description } = req.body

    Object.values(platformOptions).map(x => x.option == platform ? x.isTrue = true : x.isTrue = false)

    try {
        await gameServices.createGame({ platform, name, imageUrl, price, genre, description, owner: req.user._id })
        res.redirect('/catalog')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('game/create', { title: 'Create Game', errors, name, imageUrl, price, genre, description, platformOptions })
    }

})

module.exports = gameController