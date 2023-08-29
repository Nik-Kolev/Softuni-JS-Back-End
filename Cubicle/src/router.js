const accessoryController = require('./controllers/accessoryController');
const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const router = require('express').Router();

router.use(homeController);
router.use('/cubes', cubeController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;
