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
    res.render('login')
})

module.exports = userController