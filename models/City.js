const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  country: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = City = mongoose.model("city", CitySchema);
