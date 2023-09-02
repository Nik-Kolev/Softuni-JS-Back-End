const Cube = require('../models/Cube');

exports.createCube = (cubeData) => {
    const cube = new Cube(cubeData);
    return cube.save();
};

exports.getSingleCubeById = (id) => Cube.findById(id).populate('accessories');

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

exports.attachAccessories = async (cubeId, accessoryId) => {
    // With 1 query
    return Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });

    //With 2 queries but more readable

    // const cube = await Cube.findById(cubeId);
    // cube.accessories.push(accessoryId);
    // cube.save();
};

exports.delete = async (cubeId) => Cube.findByIdAndDelete(cubeId);
