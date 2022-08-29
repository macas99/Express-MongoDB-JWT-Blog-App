const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
})

module.exports = mongoose.model('post', postSchema);