const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClinicTypeSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = ClinicType = mongoose.model(
  "ClinicType",
  ClinicTypeSchema,
  "clinicTypes"
);
