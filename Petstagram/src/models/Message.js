const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    photo: {
        type: mongoose.Types.ObjectId,
        ref: 'Photo',
    },
});

const Message = mongoose.model('Message', msgSchema);

module.exports = Message;
