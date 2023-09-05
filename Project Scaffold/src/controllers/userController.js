const userController = require('express').Router();

const userServices = require('../services/userServices');

userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
    const { username, password } = req.body;
    await userServices.login(username, password);
});

userController.get('/register', (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    await userServices.register({ username, email, password, repeatPassword });
    res.send('Done');
});

// userController.get('/logout', (req, res) => {});

module.exports = userController;
