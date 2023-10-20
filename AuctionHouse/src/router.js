const router = require('express').Router()

const auctionController = require('./controllers/auctionController')
const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')

router.use(homeController)
router.use(userController)
router.use(auctionController)

router.get('*', (req, res) => {
    res.redirect('/404')
})

module.exports = router