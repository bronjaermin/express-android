const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
});

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
