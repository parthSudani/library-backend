const mongoose = require('mongoose');
const { centralDb } = require('../config/database');

const LibrarySchema = new mongoose.Schema({
    name: String,
    dbName: String,
});

const Library = centralDb.model('Library', LibrarySchema);

module.exports = Library;
