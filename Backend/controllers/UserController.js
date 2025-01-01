const mongoose = require("mongoose");
const userModel = require("../models/User");
const productModel = require("../models/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = new userModel({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = jwt.sign({ uid: user._id }, process.env.TOKEN_SECRET);
    if (token) {
      res.json({ accessToken: token });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports.likeProduct = async (req, res) => {
  const { uid } = req.user;
  console.log(uid);
  const { productId } = req.body;
  if (!uid || !productId) {
    return res
      .status(400)
      .json({ message: "User  ID and Product ID are required." });
  }
  try {
    const user = await userModel.findById(uid);
    if (!user) return res.status(404).json({ message: "User not found" });
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    // const pid = new mongoose.Types.ObjectId(productId);
    const likedIndex = user.liked.indexOf(product.id);

    if (likedIndex > -1) {
      // Product is already liked, remove it
      user.liked.splice(likedIndex, 1);
    } else {
      // Product is not liked, add it
      user.liked.push(pid);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addToCart = async (req, res) => {
  const { uid } = req.user;
  const { productId } = req.body;
  try {
    const user = await userModel.findById(uid);
    if (!user) return res.status(404).json({ message: "User not found" });
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const cartIndex = user.cart.find(
      (cartElement) => cartElement.product == product.id
    );
    if (cartIndex) {
      return res.status(401).send("Product already exists in cart");
    }
    user.cart.push({ product: product.id });
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Connection error : ", error });
  }
};
module.exports.removeCart = async (req, res) => {
  const { uid } = req.user;
  const { productId } = req.body;
  try {
    const user = await userModel.findById(uid);
    if (!user) return res.status(404).send("User not found");
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).send("Product not found");
    const index = user.cart.findIndex(
      (cartElement) => cartElement.product == product.id
    );
    if (index == -1) return res.status(404).send("product is not in cart");
    user.cart.splice(index, 1);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getCart = async (req, res) => {
  const { uid } = req.user;
  try {
    const user = await userModel.findById(uid);
    if (!user) return res.status(404).send("User not found");
    res.json(user.cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getLiked = async (req, res) => {
  const { uid } = req.user;
  try {
    const user = await userModel.findById(uid);
    if (!user) return res.status(404).send("User not found");
    res.json(user.liked);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
