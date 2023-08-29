const { getAll } = require('../services/cubeService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    let { search, from, to } = req.query;
    let cubes = await getAll(search, Number(from), Number(to));
    res.render('index', { cubes, search, from, to });
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

homeController.get('/404', (req, res) => {
    res.render('404');
});

module.exports = homeController;
