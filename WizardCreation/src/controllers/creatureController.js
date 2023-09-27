const creatureController = require('express').Router()
const creatureServices = require('../services/creatureServices')
const { errorHandler } = require('../utils/errorHandler')

creatureController.get('/all-posts', async (req, res) => {
    const creatures = await creatureServices.getAllCreatures()

    res.render('all-posts', { creatures, title: 'All Posts' })
})



creatureController.get('/create', (req, res) => {
    res.render('create', { title: 'Create Post' })
})

creatureController.post('/create', async (req, res) => {
    const { name, species, skin, eye, imageUrl, description } = req.body
    console.log(req.user)
    try {
        let creature = await creatureServices.createCreature({ name, species, skin, eye, imageUrl, description, owner: req.user.email })
        res.redirect('/all-posts')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('create', { errors: errors })
    }
})

creatureController.get('/details/:id', (req, res) => {
    res.render('details')
})

module.exports = creatureController