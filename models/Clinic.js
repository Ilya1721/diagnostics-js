const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClinicSchema = new Schema({
  city: {
    type: Schema.Types.ObjectId,
    required: true,
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
  type: {
    type: String,
    required: true,
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

module.exports = Clinic = mongoose.model("clinic", ClinicSchema);
