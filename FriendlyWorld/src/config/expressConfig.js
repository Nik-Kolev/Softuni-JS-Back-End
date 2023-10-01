const express = require('express')
const path = require('path')
const PORT = 3000
const cookie = require('cookie-parser')
const { authentication } = require('../middlewares/authMiddleware')

module.exports = function expressConfig(app) {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.resolve(__dirname, '../static')))
    app.use(cookie())
    app.use(authentication)
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}