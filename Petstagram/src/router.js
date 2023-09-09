const router = require('express').Router();

const homeController = require('./controllers/homeController');
const photoController = require('./controllers/photoController');
const profileController = require('./controllers/profileController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use(userController);
router.use(photoController);
router.use(profileController);

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;
