const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    fName: String,
    lName: {
        type: String,
        unique: true,
        required: true
    },
    // age: Number,
    password:String,
    username:String,
    createDate: Date
});

module.exports = mongoose.model('user', user);