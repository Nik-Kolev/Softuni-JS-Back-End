const express = require('express')
const path = require('path')
const PORT = 3000
const cookie = require('cookie-parser')
const { trimmer } = require('../middlewares/dataTrimmer')
const { authentication } = require('../middlewares/authentication')



module.exports = function expressConfig(app) {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.resolve(__dirname, '../static')))
    app.use(cookie())
    app.use(trimmer)
    app.use(authentication)
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}