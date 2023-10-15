const errorHandler = require('../utils/errorHandler')
const bookServices = require('../services/bookServices')
const { isAuthorized } = require('../middlewares/authMiddleware')
const profileController = require('express').Router()

profileController.get('/profile', isAuthorized, async (req, res) => {
    try {
        const email = req.user?.email
        const userId = req.user?._id
        const books = await bookServices.wishBooks(userId).lean()
        res.render('user/profile', { title: 'Profile', email, books })
    } catch (err) {
        const errors = errorHandler(err)
        res.render('user/profile', { title: 'Profile', errors })
    }
})

module.exports = profileController