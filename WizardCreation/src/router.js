const creatureController = require('./controllers/creatureController')
const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')

const router = require('express').Router()

router.use(homeController)
router.use(userController)
router.use(creatureController)

router.get('*', (req, res) => {
    res.redirect('/404')
})
module.exports = router