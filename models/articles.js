const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const article = new Schema({
    title: String,
    description: {
        type: String,
        required: true
    },
    author: String,
    createDate: Date
});

module.exports = mongoose.model('article', article);