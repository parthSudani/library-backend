const mongoose = require("mongoose");
const { centralDb } = require("../config/database");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    salary: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // Assuming roles are 'admin' and 'user'
      default: "user",
    },
  },
  { timestamps: true }
); // To automatically add createdAt and updatedAt timestamps

const Users = centralDb.model("User", UserSchema);

module.exports = Users;
