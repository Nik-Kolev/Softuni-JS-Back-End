const homeController = require('./controllers/homeController')

const router = require('express').Router()

router.use(homeController)



module.exports = router