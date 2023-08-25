const fs = require('fs');
const breeds = JSON.parse(fs.readFileSync('./data/breeds.json'));
const cats = JSON.parse(fs.readFileSync('./data/cats.json'));

function getBreed() {
    return breeds;
}

function createBreed(data) {
    breeds.push(data);
    fs.writeFileSync('./data/breeds.json', JSON.stringify(breeds, null, 2));
}

function getCats() {
    return cats;
}

function getCatById(id) {
    return cats.find((x) => x.id == id);
}

function editCatById(id, data) {
    let cat = getCatById(id);
    for (let key in data) {
        if (key in cat) {
            cat[key] = data[key];
        }
    }
    let catPosition = cats.indexOf(cat);
    fs.writeFileSync('./data/cats.json', JSON.stringify(cats.splice(catPosition, 1, cat), null, 2));
}

function createCat(data) {
    cats.push(data);
    fs.writeFileSync('./data/cats.json', JSON.stringify(cats, null, 2));
}

function deleteCatById(id) {
    let singleCat = getCatById(id);
    cats.splice(cats.indexOf(singleCat), 1);
    fs.writeFileSync('./data/cats.json', JSON.stringify(cats, null, 2));
}

module.exports = {
    getBreed,
    createBreed,
    getCats,
    createCat,
    getCatById,
    editCatById,
    deleteCatById,
};
