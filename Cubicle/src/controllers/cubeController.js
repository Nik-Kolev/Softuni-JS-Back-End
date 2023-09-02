const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');
const { selectLevel } = require('../utils/viewHelper');

const cubeController = require('express').Router();

cubeController.get('/create', (req, res) => {
    res.render('cube/create');
});

cubeController.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    await cubeService.createCube({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel), owner: req.user._id });
    res.redirect('/');
});

cubeController.get('/:id', async (req, res) => {
    let cube = await cubeService.getSingleCubeById(req.params.id).lean();
    if (!cube) {
        res.redirect('/404');
    }

    const isOwner = cube.owner?.toString() === req.user?._id;
    res.render('cube/details', { cube, isOwner });
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

cubeController.get('/:id/delete', async (req, res) => {
    const cube = await cubeService.getSingleCubeById(req.params.id).lean();
    const options = selectLevel(cube.difficultyLevel);
    res.render('cube/delete', { cube, options });
});

cubeController.post('/:id/delete', async (req, res) => {
    await cubeService.delete(req.params.id);
    res.redirect('/');
});

cubeController.get('/:id/edit', async (req, res) => {
    const cube = await cubeService.getSingleCubeById(req.params.id).lean();
    const options = selectLevel(cube.difficultyLevel);
    res.render('cube/edit', { cube, options });
});

cubeController.post('/:id/edit', async (req, res) => {
    const cubeData = req.body;
    await cubeService.update(req.params.id, cubeData);
    res.redirect(`/cubes/${req.params.id}`);
});

module.exports = cubeController;
