const { getCatById, deleteCatById } = require('../util/fsUtils');

const shelterController = require('express').Router();

shelterController.get('/shelterCat/:id', (req, res) => {
    console.log(req.params.id);
    res.render('shelter', { data: getCatById(req.params.id) });
});

shelterController.post('/shelterCat/:id', (req, res) => {
    deleteCatById(req.params.id);
    res.redirect('/');
});
module.exports = shelterController;
