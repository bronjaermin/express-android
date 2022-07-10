const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/exam-android")
  .then(() => console.log("Database connected..."))
  .catch((e) => console.log("ERROR DATABASE"));
