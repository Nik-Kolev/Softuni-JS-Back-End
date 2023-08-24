const homeController = require('express').Router();
const fs = require('fs');

homeController.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/cats.json'));
    res.render('home', { data });
});

module.exports = homeController;

//TODO: Refactor FS/Data into 1 module
