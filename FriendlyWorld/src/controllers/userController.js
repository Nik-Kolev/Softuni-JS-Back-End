const userController = require('express').Router()
const userServices = require('../services/userServices')

userController.get('/register', async (req, res) => {
    res.render('user/register', { title: 'Register' })
})

userController.post('/register', async (req, res) => {
    const { email, password, rePass } = req.body
    try {
        await userServices.register({ email, password, rePass })
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.render('user/register', { title: 'Register' })
    }


})

module.exports = userController