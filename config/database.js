const mongoose = require("mongoose");
const connections = {}; // Cache for dynamic connections

const centralDb = mongoose.createConnection(
  `mongodb+srv://parthsudani277:aG5qdtM1ZtdykxUx@cluster0.wu3lxbc.mongodb.net/library`,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }
);
centralDb.once("open", () => {
  console.log("Successfully connected to the central database");
});
function getLibraryConnection(dbName) {
  if (!connections[dbName]) {
    connections[dbName] = mongoose.createConnection(
      `mongodb+srv://parthsudani277:aG5qdtM1ZtdykxUx@cluster0.wu3lxbc.mongodb.net/library`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
  return connections[dbName];
}

module.exports = { centralDb, getLibraryConnection };
