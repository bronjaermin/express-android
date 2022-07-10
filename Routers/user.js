const express = require("express");
const User = require("../Models/user.js");
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
    const users = await User.find({});

    let returnType = [];
    for (let i = 0; i < users.length; i++) {
      returnType.push({
        firstName: users[i].firstName,
        lastName: users[i].lastName,
        email: users[i].email,
        password: users[i].password,
        country: users[i].country,
        city: users[i].city,
        image: users[i].image,
      });

      await users[i].populate("ads");

      returnType[i].ads = [];

      for (let j = 0; j < users[i].ads.length; j++) {
        returnType[i].ads.push({
          name: users[i].ads[j].name,
          price: users[i].ads[j].price,
          description: users[i].ads[j].description,
          image: users[i].ads[j].image,
        });
      }
      // console.log(users[i].ads.length)
    }

    res.status(200).send(returnType);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/", upload.single("userImage"), async (req, res) => {
  try {
    const user = new User({ ...req.body, image: req.file.filename });
    // const user = new User({ ...req.body });
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      return res.status(401).send();
    }

    let returnType = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      country: user.country,
      city: user.city,
      image: user.image,
    };

    await user.populate("ads");

    returnType.ads = [];

    for (let j = 0; j < user.ads.length; j++) {
      returnType.ads.push({
        name: user.ads[j].name,
        price: user.ads[j].price,
        description: user.ads[j].description,
        image: user.ads[j].image,
      });
    }

    res.status(200).send(returnType);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
