const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    created_date: { type: Date, required: true, default: Date.now },
    modified_date: { type: Date, default: Date.now }, // New field
    image: { type: String }
});

postSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.modified_date = Date.now(); // Update the modified_date before saving
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);
