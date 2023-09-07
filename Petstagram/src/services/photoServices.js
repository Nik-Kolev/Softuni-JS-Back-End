const Photo = require('../models/Photo');

exports.createPhoto = (photoData) => {
    Photo.create(photoData);
};

exports.getAll = () => Photo.find();
