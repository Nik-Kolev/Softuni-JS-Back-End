const creatureController = require('express').Router()
const { creatureDataFetcher } = require('../utils/creatureDataFetcher')
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
    const userId = req.user?._id
    try {
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails })
    } catch (err) {
        const errors = errorHandler(err)
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails, errors })
    }
})

creatureController.get('/delete/:id', async (req, res) => {
    const creatureId = req.params.id
    const userId = req.user?._id
    try {
        creatureServices.deleteCreature(creatureId)
        res.redirect('/all-posts')
    } catch (err) {
        const errors = errorHandler(err)
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails, errors })
    }
})

creatureController.get('/vote/:id', async (req, res) => {
    const creatureId = req.params.id
    const userId = req.user?._id
    try {
        creatureServices.saveVote(creatureId, req.user._id)
        res.redirect(`/details/${creatureId}`)
    } catch (err) {
        const errors = errorHandler(err)
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails, errors })
    }
})

creatureController.get('/edit/:id', async (req, res) => {
    const creatureId = req.params.id
    try {
        let creature = await creatureServices.getSingleCreature(creatureId)
        res.render('edit', { ...creature, title: 'Edit Creature' })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('edit', { errors, title: 'Edit Creature' })
    }
})

creatureController.post('/edit/:id', async (req, res) => {
    const creatureId = req.params.id
    try {
        const { name, species, skin, eye, imageUrl, description } = req.body
        await creatureServices.updateCreature(creatureId, { name, species, skin, eye, imageUrl, description })
        res.redirect(`/details/${creatureId}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('edit', { errors, title: 'Edit Creature' })
    }
})

module.exports = creatureController