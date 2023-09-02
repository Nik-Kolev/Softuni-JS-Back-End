const path = require('path');
const express = require('express');
const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const { auth } = require('../middlewares/authMiddleware');

function expressConfig(app) {
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);
}

module.exports = expressConfig;
