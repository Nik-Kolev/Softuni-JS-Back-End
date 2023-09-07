const express = require('express');

const dbConnect = require('./config/dbConfig');
const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');

const router = require('./router');

const app = express();

expressConfig(app);
hbsConfig(app);
dbConnect()
    .then(() => console.log('Database connected successfully!'))
    .catch((err) => {
        console.log('Database error', err);
    });

app.use(router);
