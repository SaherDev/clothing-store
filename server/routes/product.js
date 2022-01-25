const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

//create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const productData = req.body;

  let createdProduct;
  try {
    const newProduct = new Product(productData);

    createdProduct = await newProduct.save();
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!createdProduct)
    return res
      .status(403)
      .json({ error_message: "Could not create new product!" });

  res.status(201).json({ product: createdProduct });
});

//update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  let updatedProduct;
  try {
    updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: productData,
      },
      { new: true }
    );
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!updatedProduct)
    return res.status(404).json({ error_message: "product not found!" });

  res.status(200).json({
    product: updatedProduct,
  });
});

//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.params.id;

  let deletedProduct;
  try {
    deletedProduct = await Product.findByIdAndDelete(productId);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!deletedProduct)
    return res.status(404).json({ error_message: "product not found" });

  res.status(200).json({
    message: "product deleted!",
    product: deletedProduct,
  });
});

//find product
router.get("/find/:id", async (req, res) => {
  const ProductId = req.params.id;

  let foundProduct;
  try {
    foundProduct = await Product.findById(ProductId);
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }

  if (!foundProduct)
    return res.status(404).json({ error_message: "product not found!" });

  res.status(200).json({
    product: foundProduct,
  });
});

//get all
router.get("/", async (req, res) => {
  const offset = Number(req.query.offset);
  let limit = Number(req.query.limit);
  const qCategory = req.query.category;

  if (limit == 0) limit = Number.MAX_SAFE_INTEGER;

  let foundProducts;
  try {
    if (qCategory) {
      foundProducts = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);
    } else {
      foundProducts = await Product.find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);
    }
  } catch (err) {
    return res.status(500).json({ error_message: err.message });
  }
  if (!foundProducts)
    return res.status(404).json({ error_message: "product not foun" });

  res.status(200).json({ products: foundProducts });
});

module.exports = router;
