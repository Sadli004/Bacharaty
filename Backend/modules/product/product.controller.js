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
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid product Id" });
    }
    const product = productModel.findById(productId).select("_id");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const patient = await patientModel.findById(uid).select("liked");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const likedIndex = patient.liked.indexOf(productId);
    if (likedIndex === -1) {
      // Product is not already liked, add it
      patient.liked.push(productId);
    } else {
      // Product is already liked, remove it
      patient.liked.splice(likedIndex, 1);
    }
    await patient.save();
    res.json({ message: "Product liked successfully", patient });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
