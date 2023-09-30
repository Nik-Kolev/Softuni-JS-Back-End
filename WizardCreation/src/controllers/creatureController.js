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
        let isOwner = creature.owner._id == req.user?._id
        let canVote = await creatureServices.checkVote(creatureId, req.user?._id)
        let totalVotes = creature.votes.filter(x => x._id).length
        canVote == null ? canVote = true : canVote = false
        let emails = []
        creature.votes.map(x => emails.push(x.email))
        emails = emails.join(', ')
        res.render('details', { ...creature, title: 'Details', isOwner, canVote, totalVotes, emails })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('details', { errors, title: 'Details' })
    }

})

creatureController.get('/vote/:id', async (req, res) => {
    const creatureId = req.params.id
    creatureServices.saveVote(creatureId, req.user._id)
    res.redirect(`/details/${creatureId}`)
})

module.exports = creatureController