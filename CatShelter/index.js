const express = require('express');
const hbr = require('express-handlebars');

const addBreedController = require('./controllers/addBreedController');
const addCatController = require('./controllers/addCatController');
const editCatController = require('./controllers/editCatController');
const homeController = require('./controllers/homeController');
const shelterController = require('./controllers/shelterController');

const handlebars = hbr.create({ extname: '.hbs' });
const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use('/content', express.static('content'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => console.log('Server is on port 3000'));
app.use(express.static('content'));

app.use(homeController);

app.use(addBreedController);
app.use(addCatController);
app.use(editCatController);
app.use(shelterController);

app.get('*', (req, res) => {
    res.status(404).send('No such page exist');
});
