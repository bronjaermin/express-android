const mongoose = require("mongoose");

const temperatureSchema = new mongoose.Schema({
  time: {
    type: String,
    required: false,
  },
  temperature: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
});

const Temperature = mongoose.model("Temperature", temperatureSchema);

module.exports = Temperature;
