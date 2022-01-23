const router = require("express").Router();
const User = require("../models/User");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

//update
router.put("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!foundUser)
    return res.status(404).json({ error_message: "user not found!" });

  let updatedUser;
  try {
    if (userData.password) {
      const salt = await bcrypt.genSalt(12);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: userData,
      },
      { new: true }
    );
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!updatedUser)
    return res.status(404).json({ error_message: "user not updated!" });

  res.status(200).json({
    user: updatedUser,
  });
});
router.delete("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.params.userId;

  let deletdUser;
  try {
    deletdUser = await User.findByIdAndDelete(userId);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!deletdUser)
    return res.status(404).json({ error_message: "user not found" });

  res.status(200).json({
    message: "user deleted!",
    user: deletdUser,
  });
});

//find user
router.get("/find/:userId", verifyTokenAndAdmin, async (req, res) => {
  const userId = req.params.userId;

  let foundUser;
  try {
    foundUser = await User.findById(userId);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!foundUser)
    return res.status(404).json({ error_message: "user not found!" });

  const { password, ...others } = foundUser._doc;

  res.status(200).json({
    user: others,
  });
});

//get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const offset = Number(req.query.offset);
  let limit = Number(req.query.limit);
  if (limit == 0) limit = Number.MAX_SAFE_INTEGER;

  let foundUsers;
  try {
    foundUsers = await User.find().sort({ _id: -1 }).skip(offset).limit(limit);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
  if (!foundUsers)
    return res.status(404).json({ error_message: "users not foun" });

  res.status(200).json({ users: foundUsers });
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  let foundstats;
  try {
    foundstats = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  res.status(200).json({ stats: foundstats });
});

module.exports = router;
