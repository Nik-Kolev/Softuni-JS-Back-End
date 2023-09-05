const userController = require('express').Router();

userController.get('/login', (req, res) => {
    res.render('login');
});

userController.post('/login', (req, res) => {});

userController.get('/register', (req, res) => {
    res.render('register');
});

userController.post('/register', (req, res) => {});

// userController.get('/logout', (req, res) => {});

module.exports = userController;
