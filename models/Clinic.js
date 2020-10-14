const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const City = require("./City");
const ClinicType = require("./ClinicType");

const ClinicSchema = new Schema({
  city: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: City,
  },
  name: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  clinicType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: ClinicType,
  },
  schedule: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = Clinic = mongoose.model("Clinic", ClinicSchema, "clinics");
