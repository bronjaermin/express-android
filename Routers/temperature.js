const express = require("express");
const Temperature = require("../Models/temperature.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const temperatures = await Temperature.find({});

    res.status(200).send(temperatures);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const temperature = new Temperature(req.body);
    await temperature.save();
    res.status(201).send(temperature);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/search", async (req, res) => {
  try {
    const temperature = await Temperature.findOne({ city: req.body.city });

    if (!temperature) {
      return res.status(400).send();
    }

    res.status(200).send(temperature);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
