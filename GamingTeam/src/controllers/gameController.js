const gameController = require('express').Router()
const { platformOptions } = require('../config/additionalConfigInfo')
const gameServices = require('../services/gameServices')
const errorHandler = require('../utils/errorHandler')

gameController.get('/catalog', async (req, res) => {
    try {
        const games = await gameServices.getAllGames().lean()
        res.render('game/catalog', { title: 'Catalog', games })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('game/catalog', { title: 'Catalog', errors })
    }

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

gameController.get('/details/:id', async (req, res) => {
    try {
        let [game, canBuy] = await Promise.all([gameServices.getGameById(req.params.id).lean(), gameServices.checkIfBought(req.params.id, req.user?._id)])
        let isOwner = req.user?._id == game.owner._id
        canBuy = !canBuy
        res.render('game/details', { title: 'Game Details', ...game, isOwner, canBuy })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('game/details', { title: 'Game Details', errors })
    }
})

gameController.get('/buy/:id', async (req, res) => {
    try {
        await gameServices.buyTheGame(req.params.id, req.user?._id)
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('game/details', { title: 'Game Details', errors })
    }
})

module.exports = gameController