const express = require("express");
const Ad = require("../Models/ad.js");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const ads = await Ad.find({}).populate("owner");

    res.status(200).send(ads);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/", upload.single("adImage"), async (req, res) => {
  try {
    const ad = new Ad({ ...req.body, image: req.file.filename });
    await ad.save();
    res.status(201).send(ad);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
