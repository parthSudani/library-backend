const mongoose = require("mongoose");

// Create and export a function that returns a Book model using a specific connection
const HistorySchema = new mongoose.Schema({
  collectionId: String,
  collectionName: String,
  olaValue: String,
  changes: String,
  user: String,
});

module.exports = (connection) =>
  connection.model("History", BooHistorySchemakSchema);
