const mongoose = require("mongoose");
const connections = {}; // Cache for dynamic connections

const centralDb = mongoose.createConnection(process.env.MONGODB_URI_CENTRAL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

function getLibraryConnection(dbName) {
  if (!connections[dbName]) {
    connections[dbName] = mongoose.createConnection(
      `mongodb://localhost:27017/${dbName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
  return connections[dbName];
}

module.exports = { centralDb, getLibraryConnection };
