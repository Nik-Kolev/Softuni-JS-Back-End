const express = require('express')
const path = require('path')
const PORT = 3000
const cookie = require('cookie-parser');
const auth = require('../middlewares/authMiddleware')

module.exports = function expressConfig(app) {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(cookie())
    app.use(auth.authorization)
    app.listen(PORT, () => `Server is listening on port ${PORT}`)
}