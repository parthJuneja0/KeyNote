const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
}

module.exports = connectToMongo;