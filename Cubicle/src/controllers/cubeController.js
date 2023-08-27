const cubeService = require('../services/cubeService');

const cubeController = require('express').Router();

cubeController.get('/create', (req, res) => {
    res.render('create');
});

cubeController.post('/create', (req, res) => {
    let formData = req.body;
    cubeService.createCube(formData);
    res.redirect('/');
});

module.exports = cubeController;
