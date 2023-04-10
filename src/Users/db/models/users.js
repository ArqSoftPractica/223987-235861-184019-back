const mongoose = require('mongoose');
const validator = require('email-validator');
const constants = require('../../constants');

mongoose.connect('mongodb://localhost:27017/admin'); // probar 

const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            return validator.validate(value);
        }
    },
    companyName: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: constants.roles.all,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;