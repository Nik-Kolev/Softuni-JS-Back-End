const accessoryService = require('../services/accessoryService');
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
    const cube = await cubeService.getSingleCubeById(req.params.id).lean();
    const accessories = await accessoryService.getAvailableAccessoriesForAttachment(cube.accessories).lean();
    const hasAccessories = accessories.length > 0;
    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

cubeController.post('/:id/attach-accessories', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.id;
    cubeService.attachAccessories(cubeId, accessoryId);
    res.redirect('/cubes/' + req.params.id);
});

module.exports = cubeController;
