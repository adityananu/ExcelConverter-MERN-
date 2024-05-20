const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const Employee = new mongoose.model("employee", employeeSchema);

module.exports = Employee;
