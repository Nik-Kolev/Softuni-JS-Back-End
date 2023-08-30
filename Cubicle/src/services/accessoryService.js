const Accessory = require('../models/Accessory');

exports.createAccessory = (data) => Accessory.create(data);

exports.getAllAccessories = () => Accessory.find();

exports.getAvailableAccessoriesForAttachment = (accessoryIds) => Accessory.find({ _id: { $nin: accessoryIds } });
