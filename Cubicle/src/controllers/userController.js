const userController = require('express').Router();

userController.get('/register', async (req, res) => {
    res.render('user/register');
});

module.exports = userController;
