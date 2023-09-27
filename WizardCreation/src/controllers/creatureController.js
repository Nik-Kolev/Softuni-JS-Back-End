const creatureController = require('express').Router()
const creatureServices = require('../services/creatureServices')
const { errorHandler } = require('../utils/errorHandler')

creatureController.get('/all-posts', (req, res) => {
    console.log('asd')
    res.render('all-posts', { posts: 'asd', title: 'All Posts' })
})



creatureController.get('/create', (req, res) => {
    res.render('create', { title: 'Create Post' })
})

creatureController.post('/create', async (req, res) => {
    const { name, species, skin, eye, imageUrl, description } = req.body
    console.log(req.user)
    try {
        let creature = await creatureServices.createCreature({ name, species, skin, eye, imageUrl, description, owner: req.user.email })
        console.log(creature)
        res.redirect('/all-posts')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('create', { errors: errors })
    }
})

module.exports = creatureController