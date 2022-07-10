const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://bronjaermin:ilovemc788@cluster0.2zvuz.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Database connected..."))
  .catch((e) => console.log("ERROR DATABASE"));
