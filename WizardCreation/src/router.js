const homeController = require('./controllers/homeController')

const router = require('express').Router()

router.use(homeController)


router.get('*', (req, res) => {
    res.redirect('/404')
})
module.exports = router