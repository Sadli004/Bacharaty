const userModel = require("../../models/User");
const patientModel = require("../../models/Patient");
const productModel = require("../../models/Product");
const mongoose = require("mongoose");
module.exports.createProduct = async (req, res) => {
  const { name, brand, price, description } = req.body;
  try {
    const newProduct = new productModel({ name, brand, price, description });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json({ message: "Please enter a valid product ID" });
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports.likeProduct = async (req, res) => {
  const { uid } = req.user;
  const { productId } = req.body;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(uid) ||
      !mongoose.Types.ObjectId.isValid(productId)
    )
      return res.status(400).send("Invalid Id");
    const product = await productModel.findByIdAndUpdate(
      productId,
      {
        $push: { likers: { likerId: uid } },
        $inc: { numLikes: 1 },
      },
      { new: true }
    );
    if (!product) res.status(404).send("Product not found");
    const user = await userModel.findByIdAndUpdate(
      uid,
      {
        $push: { liked: { productId } },
      },
      { new: true }
    );
    res.send(product);
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error.message);
  }
};
module.exports.unlikeProduct = async (req, res) => {
  const { uid } = req.user;
  const { productId } = req.body;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(uid) ||
      !mongoose.Types.ObjectId.isValid(productId)
    )
      return res.status(400).send("Invalid Id");

    const product = await productModel.findByIdAndUpdate(
      productId,
      {
        $pull: { likers: { likerId: uid } },
        $inc: { numLikes: -1 },
      },
      { new: true }
    );
    if (!product) res.status(404).send("Product not found");

    const user = await userModel.findByIdAndUpdate(
      uid,
      {
        $pull: { liked: { productId } },
      },
      { new: true }
    );
    if (!user) res.status(404).send("User not found");
    res.send(product);
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error.message);
  }
};
