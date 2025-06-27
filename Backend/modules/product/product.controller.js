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

module.exports.getWishlist = async (req, res) => {
  const { uid } = req.user;

  try {
    if (!mongoose.Types.ObjectId.isValid(uid)) {
      return res.status(400).send("Invalid user id");
    }

    const user = await patientModel
      .findById(uid)
      .select("liked")
      .populate("liked");
    return res.send(user.liked);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error");
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
        $addToSet: { likers: uid },
        $inc: { numLikes: 1 },
      },
      { new: true }
    );
    if (!product) return res.status(404).send("Product not found");
    const user = await patientModel
      .findByIdAndUpdate(
        uid,
        {
          $addToSet: { liked: productId },
        },
        { new: true }
      )
      .select("liked");
    if (!user) return res.status(404).send("User not found");
    console.log(user);
    res.send(user.liked);
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error.message);
  }
};
module.exports.unlikeProduct = async (req, res) => {
  const { uid } = req.user;
  const { productId } = req.params;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(uid) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).send("Invalid Id");
    }

    const product = await productModel.findByIdAndUpdate(
      productId,
      {
        $pull: { likers: uid },
        $inc: { numLikes: -1 },
      },
      { new: true }
    );
    if (!product) return res.status(404).send("Product not found");

    const user = await patientModel.findByIdAndUpdate(
      uid,
      {
        $pull: { liked: productId },
      },
      { new: true }
    );
    if (!user) return res.status(404).send("User not found");

    console.log(user.liked);
    res.send("Product liked");
  } catch (error) {
    res.status(500).send("Internal server error");
    console.log(error.message);
  }
};
