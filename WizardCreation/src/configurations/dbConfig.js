const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/WizardCreation';

async function dbConnect() {
    await mongoose.connect(URI);
    // Checking Database status: 0: disconnected / 1: connected / 2: connecting / 3: disconnecting
    console.log(mongoose.connection.readyState);
}

module.exports = dbConnect;
