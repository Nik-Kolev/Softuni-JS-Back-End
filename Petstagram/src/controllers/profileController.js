const profileController = require('express').Router();

const photoServices = require('../services/photoServices');

profileController.get('/profile', async (req, res) => {
    const photo = await photoServices.photosByUser(req.user._id).lean();
    res.render('profile', { photo, total: photo.length });
});

module.exports = profileController;
