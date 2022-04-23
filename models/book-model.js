const mongoose = require("mongoose"),
    booksSchema = mongoose.Schema({
        name: String,
        author: String,
        link: String,
        
    });
module.exports = mongoose.model("library", booksSchema)