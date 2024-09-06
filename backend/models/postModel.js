const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    created_date: { type: Date, required: true, default: Date.now },
    image: { type: String }
});

module.exports = mongoose.model('Post', postSchema);
