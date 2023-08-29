const accessoryController = require('express').Router();

accessoryController.get('/create', (req, res) => {
    res.render('accessory/create');
});

module.exports = accessoryController;
