const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../middlewares/jwtUtil");

router.post("/register", async (req, res) => {
  const userData = req.body;

  try {
    foundUser = await User.findOne({ username: userData.username });
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (foundUser)
    return res.status(403).json({ error_message: "id already exists!" });

  let createdUser;
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedpass = await bcrypt.hash(userData.password, salt);

    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: hashedpass,
    });

    createdUser = await newUser.save();
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!createdUser)
    return res
      .status(403)
      .json({ error_message: "Could not create new user!" });

  res.status(201).json({ user: createdUser });
});

router.post("/login", async (req, res) => {
  const userData = req.body;

  try {
    foundUser = await User.findOne({ username: userData.username });
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!foundUser)
    return res.status(404).json({ error_message: "user not found!" });

  let validPassword;
  try {
    validPassword = await bcrypt.compare(userData.password, foundUser.password);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!validPassword)
    return res
      .status(404)
      .json({ error_message: "Wrong user name, password!" });

  const accessToken = createAccessToken(foundUser);

  res.status(200).json({
    user: foundUser,
    accessToken: accessToken,
  });
});

module.exports = router;
