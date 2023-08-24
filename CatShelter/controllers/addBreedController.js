const addBreedController = require('express').Router();
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/breeds.json'));

addBreedController.get('/addBreed', (req, res) => {
    res.render('addBreed');
});

addBreedController.post('/createBreed', (req, res) => {
    let breed = req.body.breed;
    if (breed != '') {
        breed = breed.trim();
        data.push({ breed: breed });
    }
    fs.writeFileSync('./data/breeds.json', JSON.stringify(data, null, 2));
    res.redirect('/');
});

module.exports = addBreedController;
