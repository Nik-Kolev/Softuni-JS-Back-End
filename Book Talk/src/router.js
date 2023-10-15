const router = require('express').Router()

const bookController = require('./controllers/bookController')
const homeController = require('./controllers/homeController')
const profileController = require('./controllers/profileController')
const userController = require('./controllers/userController')

router.use(homeController)
router.use(userController)
router.use(bookController)
router.use(profileController)

router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router