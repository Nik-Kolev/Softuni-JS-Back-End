const router = require('express').Router()

const gameController = require('./controllers/gameController')
const homeController = require('./controllers/homeController')
const searchController = require('./controllers/searchController')
const userController = require('./controllers/userController')

router.use(homeController)
router.use(userController)
router.use(gameController)
router.use(searchController)

router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router