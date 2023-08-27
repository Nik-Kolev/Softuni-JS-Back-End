const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./src/database/cubes.json'));

exports.createCube = (cubeData) => {
    let id = Date.now();
    data.push({ id, ...cubeData });
    fs.writeFile('./src/database/cubes.json', JSON.stringify(data, null, 2), () => {});
};

exports.getSingleCubeById = (id) => {
    return data.find((x) => x.id == id);
};

exports.getAll = (search, from, to) => {
    let result = data;

    if (search) {
        result = result.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter((x) => x.difficultyLevel >= from);
    }

    if (to) {
        result = result.filter((x) => x.difficultyLevel <= to);
    }

    return result;
};
