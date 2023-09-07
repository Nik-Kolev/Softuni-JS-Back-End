const photoServices = require('../services/photoServices');

const photoController = require('express').Router();

photoController.get('/addPhoto', (req, res) => {
    res.render('photos/create');
});

photoController.post('/addPhoto', async (req, res) => {
    const { name, age, description, location, image } = req.body;
    try {
        const photo = await photoServices.createPhoto({ name, age, description, location, image, owner: req.user._id });
        res.render('photos/catalog', { photo });
    } catch (err) {
        res.render('photos/create', { error: err.message });
    }
});

photoController.get('/catalog', async (req, res) => {
    const photos = await photoServices.getAll().lean();
    res.render('photos/catalog', { photos });
});

module.exports = photoController;
