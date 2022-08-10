const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    description: String,
    content: String,
    url: String,
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model("Blog", blogSchema);