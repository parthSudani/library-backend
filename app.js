require("dotenv").config();
const express = require("express");
const app = express();

const libraryRoutes = require("./routes/libraryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

// Use Routes
app.use("/libraries", libraryRoutes);
app.use("/books", bookRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
