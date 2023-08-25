const homeController = require('express').Router();
const { getCats } = require('../util/fsUtils');

homeController.get('/', (req, res) => {
    let data = getCats();
    res.render('home', { data });
});

module.exports = homeController;
