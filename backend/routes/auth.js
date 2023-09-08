const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed_password,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("Email Not Registered");
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong Password");
    }
    //res.status(200).json(user);

    const userEmail = req.body.email;
    const userObj = { email: userEmail };

    const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken, user: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // header will have bearer TOKEN.Getting the TOKEN using split
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userObj) => {
    if (err) return res.sendStatus(403);

    req.user = userObj;
  });
}

module.exports = router;
