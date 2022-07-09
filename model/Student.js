const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  matricNumber: {
    type: String,
    require: true,
  },
  dataOfBirth: {
    type: Date,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  faculty: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
