const { getCatById, getBreed, editCatById } = require('../util/fsUtils');

const editCatController = require('express').Router();

editCatController.get('/editCat/:id', (req, res) => {
    res.render('editCat', { data: getCatById(req.params.id), breed: getBreed() });
});

editCatController.post('/editCat/:id', (req, res) => {
    editCatById(req.params.id, req.body);
    res.redirect('/');
});

module.exports = editCatController;
