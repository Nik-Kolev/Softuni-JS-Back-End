const { errorHandler } = require('../utils/errorHandler')
const userServices = require('../services/userServices')

const userController = require('express').Router()

userController.get('/register', (req, res) => {
    res.render('register', { title: 'Register' })
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
        res.render('register', { errors, firstName, lastName, email, title: 'Register' })
    }
})

userController.get('/login', (req, res) => {
    res.render('login', { title: 'Login' })
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
        res.render('login', { errors, title: 'Login' })
    }
})

userController.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = userController