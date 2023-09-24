const homeController = require('express').Router()

homeController.get('/', (req, res) => {
    res.render('home')
})
homeController.get('/404', (req, res) => {
    res.render('404')
})

module.exports = homeController