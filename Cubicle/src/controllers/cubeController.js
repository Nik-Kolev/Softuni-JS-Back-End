const cubeService = require('../services/cubeService');

const cubeController = require('express').Router();

cubeController.get('/create', (req, res) => {
    res.render('create');
});

cubeController.post('/create', async (req, res) => {
    let formData = req.body;
    await cubeService.createCube(formData);
    res.redirect('/');
});

cubeController.get('/:id', async (req, res) => {
    let cube = await cubeService.getSingleCubeById(req.params.id).lean();
    if (!cube) {
        res.redirect('/404');
    }
    res.render('details', { cube });
});

cubeController.get('/:id/attach-accessories', async (req, res) => {
    res.render('accessory/attach');
});

module.exports = cubeController;
