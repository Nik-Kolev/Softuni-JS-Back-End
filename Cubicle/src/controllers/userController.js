const userService = require('../services/userService');
const { extractErrors } = require('../utils/errorHelper');

const userController = require('express').Router();

userController.get('/register', async (req, res) => {
    res.render('user/register');
});

userController.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    try {
        await userService.register({ username, password, repeatPassword });
        res.redirect('/login');
    } catch (err) {
        const errors = extractErrors(err);
        res.status(404).render('user/register', { message: errors });
    }
});

userController.get('/login', (req, res) => {
    res.render('user/login');
});

userController.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.cookie('auth', token, { httpOnly: true });
    res.redirect('/');
});

userController.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = userController;
