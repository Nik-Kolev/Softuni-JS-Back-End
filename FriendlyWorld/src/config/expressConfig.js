const express = require('express')
const path = require('path')
const PORT = 3000

module.exports = function expressConfig(app) {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.resolve(__dirname, '../static')))
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}