const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const City = require("./City");
const Job = require("./Job");
const Department = require("./Department");
const Clinic = require("./Clinic");

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  clinic: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Clinic,
  },
  city: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: City,
  },
  job: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Job,
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Department,
  },
  about: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  fatherName: {
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
  flat: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("User", UserSchema, "users");
