const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const router = require('express').Router();

router.use(homeController);
router.use('/cubes', cubeController);
router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;
