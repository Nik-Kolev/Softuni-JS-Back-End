const router = require('express').Router()

const homeController = require('./controllers/homeController')
const petController = require('./controllers/petController')
const searchController = require('./controllers/searchController')
const userController = require('./controllers/userController')

router.use(homeController)
router.use(userController)
router.use(petController)
router.use(searchController)

router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router