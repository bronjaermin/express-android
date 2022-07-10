const express = require("express");
require("./Database/mongoose.js");
require("dotenv").config();
const cors = require("cors");

const userRouter = require("./Routers/user.js");
const adRouter = require("./Routers/ad.js");

const app = express();
const config = process.env;
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/users", userRouter);
app.use("/ads", adRouter);

app.listen(config.PORT || 3000, () => {
  console.log("Listening on port 3000...");
});
