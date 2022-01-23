const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const Cart = require("../models/Cart");

//create
router.post("/", verifyToken, async (req, res) => {
  const cartData = req.body;

  let createdcart;
  try {
    const newCart = new Cart(cartData);
    createdcart = await newCart.save();
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!createdcart)
    return res
      .status(403)
      .json({ error_message: "Could not create new order!" });

  res.status(201).json({ cart: createdcart });
});

//update
router.put("/:userId/:id", verifyTokenAndAuthorization, async (req, res) => {
  const cartId = req.params.id;
  const cartData = req.body;

  let updatedCart;
  try {
    updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: cartData,
      },
      { new: true }
    );
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!updatedCart)
    return res.status(404).json({ error_message: "Cart not found!" });

  res.status(200).json({
    cart: updatedCart,
  });
});

//delete
router.delete("/:userId/:id", verifyTokenAndAuthorization, async (req, res) => {
  const cartId = req.params.id;

  let deletedCart;
  try {
    deletedCart = await Cart.findByIdAndDelete(cartId);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!deletedCart)
    return res.status(404).json({ error_message: "Cart not found" });

  res.status(200).json({
    message: "Cart deleted!",
    cart: deletedCart,
  });
});

//get user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.params.userId;
  let foundCart;
  try {
    foundCart = await Cart.findOne({ userId: userId });
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!foundCart)
    return res.status(404).json({ error_message: "cart not found!" });

  res.status(200).json({
    order: foundCart,
  });
});

//get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const offset = Number(req.query.offset);
  let limit = Number(req.query.limit);
  if (limit == 0) limit = Number.MAX_SAFE_INTEGER;

  let foundCarts;
  try {
    foundCarts = await Cart.find().skip(offset).limit(limit);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
  if (!foundCarts)
    return res.status(404).json({ error_message: "orders not foun" });

  res.status(200).json({ cart: foundCarts });
});

module.exports = router;
