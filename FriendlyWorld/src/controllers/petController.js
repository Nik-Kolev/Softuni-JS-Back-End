const errorHandler = require('../utils/errorHandler')
const petServices = require('../services/petServices')
const petController = require('express').Router()

petController.get('/add-animal', (req, res) => {
    res.render('pets/create', { title: 'Add Animal' })
})

petController.post('/add-animal', async (req, res) => {
    const { name, years, kind, imageUrl, needs, location, description } = req.body
    try {
        let pet = await petServices.createPet({ name, years, kind, imageUrl, needs, location, description, owner: req.user?._id })
        res.render('pets/create', { pet, title: 'Add Animal' })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/create', { title: 'Add Animal', errors, name, years, kind, imageUrl, needs, location, description })
    }
})

petController.get('/details/:id', async (req, res) => {
    try {
        const pet = await petServices.getSpecificPet(req.params.id)

        let isOwner = req.user?._id == pet.owner._id
        let canDonate = true

        if (req.user?._id != undefined) {
            canDonate = false
        }
        console.log(req.user?._id)
        console.log(canDonate)
        res.render('pets/details', { title: 'Pet Details', ...pet, isOwner, canDonate })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/details', { title: 'Pet Details', errors })
    }

})

petController.post('/donate/:id', async (req, res) => {
    try {
        let pet = await petServices.getSpecificPet(req.params.id)

        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/details', { title: 'Pet Details', errors })
    }

})

module.exports = petController