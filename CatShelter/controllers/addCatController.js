const addCatController = require('express').Router();
const fs = require('fs');
const breeds = JSON.parse(fs.readFileSync('./data/breeds.json'));
const cats = JSON.parse(fs.readFileSync('./data/cats.json'));

addCatController.get('/addCat', (req, res) => {
    res.render('addCat', { breeds });
});

addCatController.post('/createCat', (req, res) => {
    let cat = req.body;
    cats.push(cat);
    fs.writeFileSync('./data/cats.json', JSON.stringify(cats, null, 2));
    res.redirect('/');
});

module.exports = addCatController;
