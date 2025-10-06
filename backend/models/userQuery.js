const mongoose = require("mongoose");

const userQuerySchema = new mongoose.Schema({
  user_input: String,
  matched_schemes: [String],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserQuery", userQuerySchema);
