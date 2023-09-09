const Message = require('../models/Message');

exports.sendMsg = (msgData) => Message.create(msgData);
exports.getAllMessages = (id) => Message.find({ photo: id }).populate('owner');
