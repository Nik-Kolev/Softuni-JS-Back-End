const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('index');
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

module.exports = homeController;
