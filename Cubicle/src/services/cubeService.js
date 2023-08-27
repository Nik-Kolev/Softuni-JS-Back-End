const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./src/database/cubes.json'));

exports.createCube = (cubeData) => {
    let id = Date.now();
    data.push({ id, ...cubeData });
    fs.writeFile('./src/database/cubes.json', JSON.stringify(data, null, 2), () => {});
};

exports.getAll = () => data;
