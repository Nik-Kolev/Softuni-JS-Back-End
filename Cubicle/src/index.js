const express = require('express');
const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');
const homeController = require('./controllers/homeController');

const app = express();
const port = 3000;

expressConfig(app);
hbsConfig(app);

app.use(homeController);

app.listen(port, () => console.log(`Server is working on ${port}`));
