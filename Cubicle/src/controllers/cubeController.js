const cubeController = require('express').Router();

cubeController.get('/create', (req, res) => {
    res.render('create');
});

cubeController.post('/create', (req, res) => {
    let formData = req.body;
    console.log(formData);
    res.redirect('/');
});

module.exports = cubeController;
