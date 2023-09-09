const photoServices = require('../services/photoServices');
const messageServices = require('../services/messageServices');
const { authorization } = require('../middlewares/authMiddleware');
const photoController = require('express').Router();

photoController.get('/addPhoto', authorization, (req, res) => {
    res.render('photos/create');
});

photoController.post('/addPhoto', authorization, async (req, res) => {
    const { name, age, description, location, image } = req.body;
    try {
        await photoServices.createPhoto({ name, age, description, location, image, owner: req.user._id });
        res.redirect('/catalog');
    } catch (err) {
        res.render('photos/create', { error: err.message });
    }
});

photoController.get('/catalog', async (req, res) => {
    const photos = await photoServices.getAll().lean();
    res.render('photos/catalog', { photos });
});

photoController.get('/photoDetails/:id', async (req, res) => {
    try {
        const [photo, messages] = await Promise.all([photoServices.getSinglePhotoById(req.params.id).lean(), messageServices.getAllMessages(req.params.id).lean()]);
        const isOwner = req.user?._id == photo.owner._id;
        res.render('photos/details', { photo, isOwner, messages });
    } catch (err) {
        res.render('photos/details', { error: err.message });
    }
});

photoController.get('/photoDetails/:id/delete', authorization, async (req, res) => {
    try {
        await photoServices.deletePhoto(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.render(`photos/details`, { error: 'Unsuccessful photo deletion!' });
    }
});

photoController.get('/photoDetails/:id/edit', authorization, async (req, res) => {
    try {
        const photo = await photoServices.getSinglePhotoById(req.params.id).lean();
        res.render('photos/edit', { photo });
    } catch (err) {
        res.render('photo/details', { error: err.message });
    }
});

photoController.post('/photoDetails/:id/edit', authorization, async (req, res) => {
    const photoData = req.body;
    try {
        await photoServices.updatePhoto(req.params.id, photoData).lean();
        res.redirect(`/photoDetails/${req.params.id}`);
    } catch (err) {
        res.render('photos/edit', { error: 'Unable to update photo', ...data });
    }
});

photoController.post('/photoDetails/:id', authorization, async (req, res) => {
    try {
        await messageServices.sendMsg({ message: req.body.message, owner: req.user, photo: req.params.id });
        res.redirect(`/photoDetails/${req.params.id}`);
    } catch (err) {
        res.render(`/photoDetails/${req.params.id}`, { error: err.message });
    }
});

module.exports = photoController;
