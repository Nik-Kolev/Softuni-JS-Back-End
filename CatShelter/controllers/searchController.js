const { getCatsByName, getCats } = require('../util/fsUtils');

const searchController = require('express').Router();

searchController.get('/search', (req, res) => {
    let srValue = req.query.searchValue;
    let data = getCatsByName(srValue);
    res.render('home', { data });
});

module.exports = searchController;
