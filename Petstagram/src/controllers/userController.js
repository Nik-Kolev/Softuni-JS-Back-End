const userController = require('express').Router();
const userServices = require('../services/userServices');

userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userServices.login(username, password);
        res.cookie('token', token);
        res.render('home');
    } catch (err) {
        res.render('user/login', { error: err.message });
    }
});

userController.get('/register', (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    try {
        const token = await userServices.register({ username, email, password, repeatPassword });
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('user/register', { error: err.message });
    }
});

userController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = userController;
