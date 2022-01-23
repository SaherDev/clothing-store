const router = require("express").Router();
const Order = require("../models/Order");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const Product = require("../models/Product");

//create
router.post("/", async (req, res) => {
  const orderData = req.body;

  let createdProduct;
  try {
    const newOrder = new Order(orderData);

    createdProduct = await newOrder.save();
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!createdProduct)
    return res
      .status(403)
      .json({ error_message: "Could not create new order!" });

  res.status(201).json({ order: createdProduct });
});

//update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const orderId = req.params.id;
  const orderData = req.body;

  let updatedProduct;
  try {
    updatedProduct = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: orderData,
      },
      { new: true }
    );
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!updatedProduct)
    return res.status(404).json({ error_message: "Order not found!" });

  res.status(200).json({
    order: updatedProduct,
  });
});

//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const orderId = req.params.id;

  let deletedOrder;
  try {
    deletedOrder = await Order.findByIdAndDelete(orderId);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!deletedOrder)
    return res.status(404).json({ error_message: "Order not found!" });

  res.status(200).json({
    message: "order deleted!",
    order: deletedOrder,
  });
});

//get user orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.params.userId;
  const offset = Number(req.query.offset);
  let limit = Number(req.query.limit);
  if (limit == 0) limit = Number.MAX_SAFE_INTEGER;

  let foundOrders;
  try {
    foundOrders = await Order.find({ userId: userId })
      .skip(offset)
      .limit(limit);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!foundOrders)
    return res.status(404).json({ error_message: "Order not found!" });

  res.status(200).json({
    order: foundOrders,
  });
});

//get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const offset = Number(req.query.offset);
  let limit = Number(req.query.limit);
  if (limit == 0) limit = Number.MAX_SAFE_INTEGER;

  let foundOrders;
  try {
    foundOrders = await Order.find().skip(offset).limit(limit);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
  if (!foundOrders)
    return res.status(404).json({ error_message: "orders not found!" });

  res.status(200).json({ order: foundOrders });
});

//get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.productId;

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  let income;
  try {
    income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  res.status(200).json({ income: income });
});

module.exports = router;
