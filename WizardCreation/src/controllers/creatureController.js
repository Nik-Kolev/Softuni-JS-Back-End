const creatureController = require('express').Router()
const creatureServices = require('../services/creatureServices')
const { errorHandler } = require('../utils/errorHandler')

creatureController.get('/all-posts', async (req, res) => {
    try {
        const creatures = await creatureServices.getAllCreatures()
        res.render('all-posts', { creatures, title: 'All Posts' })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('all-posts', { errors, title: 'All Posts' })
    }

})

creatureController.get('/create', (req, res) => {
    res.render('create', { title: 'Create Post' })
})

creatureController.post('/create', async (req, res) => {
    const { name, species, skin, eye, imageUrl, description } = req.body
    try {
        await creatureServices.createCreature({ name, species, skin, eye, imageUrl, description, owner: req.user._id })
        res.redirect('/all-posts')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('create', { errors })
    }
})

creatureController.get('/details/:id', async (req, res) => {
    const creatureId = req.params.id
    try {

        let creature = await creatureServices.getSingleCreature(creatureId)
        let isOwner = creature.owner._id == req.user._id
        res.render('details', { creature, title: 'Details', isOwner })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('details', { errors, title: 'Details' })
    }

})

module.exports = creatureController