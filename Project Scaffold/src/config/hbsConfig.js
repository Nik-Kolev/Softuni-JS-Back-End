const hbs = require('express-handlebars')
const path = require('path')

module.exports = function hbsConfig(app) {
    app.engine('hbs', hbs.engine({ extname: 'hbs' }))
    app.set('view engine', 'hbs')
    app.set('views', path.resolve(__dirname, '../views'))
}
