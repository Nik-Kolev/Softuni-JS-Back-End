const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const PORT = 3000;

function expressConfig(app) {
    app.use(urlencoded({ extended: false }));
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
}

module.exports = expressConfig;
