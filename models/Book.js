const mongoose = require("mongoose");
const Library = require("./Library");

// Create and export a function that returns a Book model using a specific connection
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  libraryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Library.name,
  },
});

module.exports = (connection) => connection.model("Book", BookSchema);
