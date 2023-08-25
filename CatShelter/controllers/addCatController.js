const addCatController = require('express').Router();
const { createCat, getBreed } = require('../util/fsUtils');

addCatController.get('/addCat', (req, res) => {
    res.render('addCat', { breeds: getBreed() });
});

addCatController.post('/createCat', (req, res) => {
    let data = req.body;
    data.id = Date.now();
    createCat(data);
    res.redirect('/');
});

module.exports = addCatController;
