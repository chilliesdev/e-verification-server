const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  dataOfBirth: {
    type: Date,
    require: true,
  },
  educationLevel: {
    type: String,
    require: true,
  },
  postion: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  staffNo: {
    type: String,
    require: true,
  },
  hash: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
