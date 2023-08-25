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

function getCatsByName(name) {
    return cats.filter((x) => x.name.includes(name));
}

function editCatById(id, data) {
    let cat = getCatById(id);
    for (let key in data) {
        if (key in cat) {
            cat[key] = data[key];
        }
    }
    cats.splice(cats.indexOf(cat), 1, cat);
    fs.writeFileSync('./data/cats.json', JSON.stringify(cats, null, 2));
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
    getCatsByName,
};
