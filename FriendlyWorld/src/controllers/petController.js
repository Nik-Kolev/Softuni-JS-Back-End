const errorHandler = require('../utils/errorHandler')
const petServices = require('../services/petServices')
const petController = require('express').Router()
const { isAuthorized } = require('../middlewares/authMiddleware')

petController.get('/add-animal', isAuthorized, (req, res) => {
    res.render('pets/create', { title: 'Add Animal' })
})

petController.post('/add-animal', isAuthorized, async (req, res) => {
    const { name, years, kind, imageUrl, needs, location, description } = req.body
    try {
        await petServices.createPet({ name, years, kind, imageUrl, needs, location, description, owner: req.user?._id })
        res.redirect('/dashboard')
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/create', { title: 'Add Animal', errors, name, years, kind, imageUrl, needs, location, description })
    }
})

petController.get('/details/:id', async (req, res) => {
    try {
        const pet = await petServices.getSpecificPet(req.params.id)

        let isOwner = req.user?._id == pet.owner._id
        let canDonate = await petServices.checkDonations(pet._id, req.user?._id)
        canDonate = !canDonate

        res.render('pets/details', { title: 'Pet Details', ...pet, isOwner, canDonate, user: req.user })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/details', { title: 'Pet Details', errors })
    }

})

petController.get('/donate/:id', isAuthorized, async (req, res) => {
    try {
        await petServices.donations(req.params.id, req.user._id)
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/details', { title: 'Pet Details', errors })
    }
})

petController.get('/dashboard', async (req, res) => {
    try {
        const pets = await petServices.getAllPets()
        res.render('pets/dashboard', { title: 'Dashboard', pets })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/dashboard', { title: 'Dashboard', errors })
    }
})

petController.get('/delete/:id', isAuthorized, async (req, res) => {
    try {
        await petServices.deletePet(req.params.id)
        res.redirect('/dashboard')
    } catch (err) {
        const errors = errorHandler(err)
        res.render(`/details/${req.params.id}`, { title: 'Pet Details', errors })
    }
})

petController.get('/edit/:id', isAuthorized, async (req, res) => {
    try {
        const pet = await petServices.getSpecificPet(req.params.id)
        res.render('pets/edit', { title: 'Edit Pet Info', ...pet })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/edit', { title: 'Edit Pet Info', errors })
    }
})

petController.post('/edit/:id', isAuthorized, async (req, res) => {
    const { name, years, kind, imageUrl, needs, location, description } = req.body
    try {
        await petServices.editPet(req.params.id, { name, years, kind, imageUrl, needs, location, description })
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        const errors = errorHandler(err)
        res.render('pets/edit', { title: 'Edit Pet Info', errors, name, years, kind, imageUrl, needs, location, description })
    }
})

module.exports = petController