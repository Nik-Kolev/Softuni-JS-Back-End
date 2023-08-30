const Accessory = require('../models/Accessory');

exports.createAccessory = (data) => Accessory.create(data);

exports.getAllAccessories = () => Accessory.find();

exports.getById = (id) => Accessory.findById(id);
