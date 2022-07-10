const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

userSchema.virtual("ads", {
  ref: "Ad",
  localField: "_id",
  foreignField: "owner",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
