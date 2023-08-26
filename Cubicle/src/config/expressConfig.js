const path = require('path');
const express = require('express');
const { urlencoded } = require('express');

function expressConfig(app) {
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(urlencoded({ extended: false }));
}

module.exports = expressConfig;
