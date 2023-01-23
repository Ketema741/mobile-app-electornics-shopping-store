const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");

const auth = require("../middleware/auth");

const cloudinary = require("cloudinary");
const Product = require("../models/Product");

// @route     GET api/Products
// @desc      Get all product
// @access    Public
router.get("/", async (req, res) => {
  try {
    const product = await Product.find().sort({
      date: -1,
    });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/product/product
// @desc      Get admin product
// @access    Private
router.get("/product", auth, async (req, res) => {
  try {
    // const product = await Product.find({ user: req.user.id }).sort({
    //   date: -1,
    // });
    res.json(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/auth
// @desc     Get single product
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: req.params.id });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/products
// @desc      Add new products
// @access    Private
router.post(
  "/",
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      title,
      price,
      description,
      relatedProduct,
      url,
    } = req.body;

    try {
      const newProduct = new Product({
        name,
        title,
        price,
        description,
        relatedProduct,
        url,
      });
      const product = await newProduct.save();
      res.json(newProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/product/:id
// @desc      Update product
// @access    Private
router.put("/:id", async (req, res) => {
  const {
    name,
    title,
    price,
    description,
    relatedProduct,
    productImages,
  } = req.body;

  // Build product object
  const productFields = {};
  if (title) productFields.title = title;
  if (description) productFields.description = description;
  if (name) productFields.name = name;
  if (relatedProduct) productFields.relatedProduct = relatedProduct;
  if (productImages) productFields.productImages = productImages;
  if (price) productFields.price = price;
  

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "product not found" });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/product/:id
// @desc      Delete product
// @access    Private
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "product not found" });

    // const { productImages } = product
    // deleteImage(productImages)

     await Product.findByIdAndRemove(req.params.id);
    res.json({ msg: "product removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_key"),
  api_secret: config.get("api_secret"),
});




module.exports = router; 