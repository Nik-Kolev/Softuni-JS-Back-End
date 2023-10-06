const router = require('express').Router()

const gameController = require('./controllers/gameController')
const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')

router.use(homeController)
router.use(userController)
router.use(gameController)

router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router