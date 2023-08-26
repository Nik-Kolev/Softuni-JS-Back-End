const express = require('express');
const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');

const app = express();
const port = 3000;

expressConfig(app);
hbsConfig(app);

app.listen(port, () => console.log(`Server is working on ${port}`));
