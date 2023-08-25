const { getCatById, getBreed, editCatById } = require('../util/fsUtils');

const editCatController = require('express').Router();

editCatController.get('/editCat/:id', (req, res) => {
    let id = req.params.id;
    let data = getCatById(id);
    res.render('editCat', { data, breed: getBreed() });
});

editCatController.post('/editCat/:id', (req, res) => {
    editCatById(req.params.id, req.body);
    res.redirect('/');
});

module.exports = editCatController;
