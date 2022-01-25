const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  createAccessToken,
  createRefreshToken,
  jwtVerify,
} = require("../middlewares/jwtUtil");

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

  let accessToken;
  let refreshtoken;
  try {
    accessToken = createAccessToken(foundUser);
    refreshtoken = createRefreshToken(foundUser);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!refreshtoken)
    return res.status(404).json({ error_message: "Could not create token!" });

  if (!refreshtoken)
    return res.status(404).json({ error_message: "Could not create token!" });

  res.status(200).json({
    user: foundUser,
    accessToken: accessToken,
    refreshtoken: refreshtoken,
  });
});

router.post("/refresh_token/", async (req, res) => {
  const refreshtokenData = req.body.refreshtoken;

  if (!refreshtokenData) return res.status(401).json({ accesstoken: "" });

  let payload;
  try {
    payload = jwtVerify(refreshtokenData, process.env.JWT_REF_TOKEN_KEY);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!payload) return res.status(401).json({ accesstoken: "" });

  let foundUser;
  try {
    foundUser = await User.findById(payload.id);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!foundUser) return res.status(401).json({ accesstoken: "" });

  if (foundUser.tokenversion !== payload.tokenversion)
    return res.status(401).json({ accesstoken: "" });

  let accesstoken;

  try {
    accesstoken = createAccessToken(foundUser);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!accesstoken) return res.status(401).json({ accesstoken: "" });

  res.status(200).json({
    accessToken: accesstoken,
  });
});

module.exports = router;
