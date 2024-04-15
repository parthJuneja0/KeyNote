// Here, i write the code to connect to the database

const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/inotebooktest'

const connectToMongo = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // These are not required btw
    console.log('Connected to MongoDB');
}

module.exports = connectToMongo;