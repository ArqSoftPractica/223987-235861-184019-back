const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://localhost:27017/admin');

async function getUserByEmail(email){
    return User.findOne({ email });
}