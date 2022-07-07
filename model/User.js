const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  hash: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
