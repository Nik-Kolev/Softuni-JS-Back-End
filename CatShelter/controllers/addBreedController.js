const addBreedController = require('express').Router();
const { createBreed } = require('../util/fsUtils');

addBreedController.get('/addBreed', (req, res) => {
    res.render('addBreed');
});

addBreedController.post('/createBreed', (req, res) => {
    let breed = req.body.breed;
    if (breed != '') {
        breed = breed.trim();
        createBreed({ breed });
    }
    res.redirect('/');
});

module.exports = addBreedController;
