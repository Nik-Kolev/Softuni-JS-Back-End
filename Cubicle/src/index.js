const express = require('express');
const dbConnect = require('./config/dbConfig');
const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');
const router = require('./router');

const app = express();
const port = 3000;

expressConfig(app);
hbsConfig(app);

dbConnect()
    .then(() => console.log('DB Connected successfully!'))
    .catch((err) => {
        console.log('DB error', err);
    });

app.use(router);

app.listen(port, () => console.log(`Server is working on ${port}`));
