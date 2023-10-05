const mongoose = require('mongoose')
const URI = 'mongodb://127.0.0.1:27017/GamingTeam';

module.exports = async function mongooseConfig() {
    try {
        await mongoose.connect(URI)
        console.log('DB is connected successfully!')
    } catch (err) {
        console.log(err)
    }

}
