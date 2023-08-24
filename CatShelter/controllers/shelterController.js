const shelterController = require('express').Router();

shelterController.get('/shelterCat', (req, res) => {
    res.render('shelter');
});

module.exports = shelterController;
