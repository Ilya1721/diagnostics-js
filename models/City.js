const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Country = require("./Country");

const CitySchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Country,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = City = mongoose.model("City", CitySchema, "cities");
