const editCatController = require('express').Router();

editCatController.get('/editCat', (req, res) => {
    res.render('editCat');
});

module.exports = editCatController;
