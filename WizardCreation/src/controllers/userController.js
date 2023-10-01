const { errorHandler } = require('../utils/errorHandler')
const userServices = require('../services/userServices')
const creatureServices = require('../services/creatureServices')
const userController = require('express').Router()

userController.get('/register', (req, res) => {
    res.render('user/register', { title: 'Register' })
})

userController.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, rePassword } = req.body
    try {
        let token = await userServices.createUser({ firstName, lastName, email, password, rePassword })
        res.cookie('token', token)
        res.redirect('/')
    } catch (err) {
        const errors = errorHandler(err)
        res.clearCookie('token')
        res.render('user/register', { errors, firstName, lastName, email, title: 'Register' })
    }
})

userController.get('/login', (req, res) => {
    res.render('user/login', { title: 'Login' })
})

userController.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        let token = await userServices.loginUser({ email, password })
        res.cookie('token', token)
        res.redirect('/')
    } catch (err) {
        const errors = errorHandler(err)
        res.clearCookie('token')
        res.render('user/login', { errors, title: 'Login' })
    }
})

userController.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

userController.get('/profile', async (req, res) => {
    const userId = req.user._id
    try {
        let creatures = await creatureServices.getAllOwnedCreatures(userId)
        console.log(creatures)
        res.render('user/profile', { title: 'Profile', creatures })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('user/profile', { errors, title: 'Profile' })
    }
})

module.exports = userController