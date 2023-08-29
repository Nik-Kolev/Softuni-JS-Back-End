const accessoryService = require('../services/accessoryService');

const accessoryController = require('express').Router();

accessoryController.get('/create', (req, res) => {
    res.render('accessory/create');
});

accessoryController.post('/create', async (req, res) => {
    let data = req.body;
    await accessoryService.createAccessory(data);
    res.redirect('/');
});

module.exports = accessoryController;
