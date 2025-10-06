const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
  name: String,
  age_min: Number,
  age_max: Number,
  income_max: Number,
  occupation: String,
  state: String,
  benefits: String,
  documents: [String],
  apply_link: String
});

module.exports = mongoose.model("Scheme", schemeSchema);
