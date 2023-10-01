const creatureController = require('express').Router()
const { creatureDataFetcher } = require('../utils/creatureDataFetcher')
const creatureServices = require('../services/creatureServices')
const { errorHandler } = require('../utils/errorHandler')
const { authentication } = require('../middlewares/authMiddleware')

creatureController.get('/all-posts', async (req, res) => {
    try {
        const creatures = await creatureServices.getAllCreatures()
        res.render('all-posts', { creatures, title: 'All Posts' })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('all-posts', { errors, title: 'All Posts' })
    }

})

creatureController.get('/create', authentication, (req, res) => {
    res.render('creature/create', { title: 'Create Post' })
})

creatureController.post('/create', authentication, async (req, res) => {
    const { name, species, skin, eye, imageUrl, description } = req.body
    try {
        await creatureServices.createCreature({ name, species, skin, eye, imageUrl, description, owner: req.user._id })
        res.redirect('/all-posts')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('creature/create', { errors })
    }
})

creatureController.get('/details/:id', authentication, async (req, res) => {
    const creatureId = req.params.id
    const userId = req.user?._id
    try {
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('creature/details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails })
    } catch (err) {
        const errors = errorHandler(err)
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('creature/details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails, errors })
    }
})

creatureController.get('/delete/:id', authentication, async (req, res) => {
    const creatureId = req.params.id
    const userId = req.user?._id
    try {
        creatureServices.deleteCreature(creatureId)
        res.redirect('/all-posts')
    } catch (err) {
        const errors = errorHandler(err)
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('creature/details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails, errors })
    }
})

creatureController.get('/vote/:id', authentication, async (req, res) => {
    const creatureId = req.params.id
    const userId = req.user?._id
    try {
        creatureServices.saveVote(creatureId, req.user._id)
        res.redirect(`/details/${creatureId}`)
    } catch (err) {
        const errors = errorHandler(err)
        const { creature, isOwner, canVote, totalVotes, emails } = await creatureDataFetcher(creatureId, userId)
        res.render('creature/details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails, errors })
    }
})

creatureController.get('/edit/:id', authentication, async (req, res) => {
    const creatureId = req.params.id
    try {
        let creature = await creatureServices.getSingleCreature(creatureId)
        res.render('creature/edit', { ...creature, title: 'Edit Creature' })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('creature/edit', { errors, title: 'Edit Creature' })
    }
})

creatureController.post('/edit/:id', authentication, async (req, res) => {
    const creatureId = req.params.id
    try {
        const { name, species, skin, eye, imageUrl, description } = req.body
        await creatureServices.updateCreature(creatureId, { name, species, skin, eye, imageUrl, description })
        res.redirect(`/details/${creatureId}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('creature/edit', { errors, title: 'Edit Creature' })
    }
})

module.exports = creatureController