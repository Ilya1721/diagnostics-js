const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Job", JobSchema, "jobs");
