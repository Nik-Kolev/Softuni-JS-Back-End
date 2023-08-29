const Cube = require('../models/Cube');

exports.createCube = (cubeData) => {
    const cube = new Cube(cubeData);
    return cube.save();
};

exports.getSingleCubeById = (id) => Cube.findById(id);

exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean();
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
