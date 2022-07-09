const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  matricnumber: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Student", studentSchema);
