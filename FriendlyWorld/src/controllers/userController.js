const userController = require('express').Router()
const userServices = require('../services/userServices')
const errorHandler = require('../utils/errorHandler')

userController.get('/register', async (req, res) => {
    res.render('user/register', { title: 'Register' })
})

userController.post('/register', async (req, res) => {
    const { email, password, rePass } = req.body
    try {
        const token = await userServices.register({ email, password, rePass })
        res.cookie('token', token)
        res.redirect('/')
    } catch (err) {
        const errors = errorHandler(err)
        console.log(errors)
        res.clearCookie()
        res.render('user/register', { title: 'Register', errors })
    }
})

userController.get('/login', (req, res) => {
    res.render('user/login', { title: 'Login' })
})

userController.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await userServices.login({ email, password })
        res.cookie('token', token)
        res.redirect('/')
    } catch (err) {
        const errors = errorHandler(err)
        res.clearCookie()
        res.render('user/login', { title: 'Login', errors })
    }
})

userController.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = userController