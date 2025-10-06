const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  income: Number,
  occupation: String,
  state: String,
  preferred_language: { type: String, default: "en" }
});

module.exports = mongoose.model("User", userSchema);
