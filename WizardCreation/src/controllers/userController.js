const userServices = require('../services/userServices')

const userController = require('express').Router()

userController.get('/register', (req, res) => {
    res.render('register')
})

userController.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, rePassword } = req.body
    try {
        let user = await userServices.createUser({ firstName, lastName, email, password, rePassword })
        console.log(user)
        res.redirect('/')
    } catch (err) {
        const errors = Object.values(err.errors).map(x => x.properties.message)
        // console.log(errors.map(x => x.properties.message))
        res.render('register', { errors })
    }


})

userController.get('/login', (req, res) => {
    res.render('login')
})

module.exports = userController