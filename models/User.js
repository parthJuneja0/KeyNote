const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 24
    },
    email: {
        type: String,
        maxlength: 32,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 60
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("user", UserSchema);