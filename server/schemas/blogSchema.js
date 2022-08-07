const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: String,
    content: String,
    date: String
});

module.exports = mongoose.model("Blog", blogSchema);