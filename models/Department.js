const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Department = mongoose.model(
  "Department",
  DepartmentSchema,
  "departments"
);
