const Photo = require('../models/Photo');

exports.createPhoto = (photoData) => {
    Photo.create(photoData);
};

exports.getAll = () => Photo.find().populate('owner');

exports.getSinglePhotoById = (id) => Photo.findById(id).populate('owner');
