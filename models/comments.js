const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = new Schema({
    comment: String,
    article: String,
    createDate: Date
});

module.exports = mongoose.model('comment', comment);