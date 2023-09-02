const userService = require('../services/userService');

const userController = require('express').Router();

userController.get('/register', async (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    await userService.register({ username, password, repeatPassword });
    res.redirect('/login');
});

userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
    const { username, password } = req.body;
    await userService.login(username, password);
    res.redirect('/');
});

module.exports = userController;
