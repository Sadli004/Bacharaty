const Patient = require("../../models/Patient");
const userModel = require("../../models/User");
const productModel = require("../../models/Product");
const mongoose = require("mongoose");
module.exports.signup = async (req, res) => {
  const info = req.body;
  try {
    const hashed = await bcrypt.hash(user.password, 10);
    req.body.password = hashed;
    const newPatient = new Patient(req.body);
    await newPatient.save();
    const token = jwt.sign({ uid: newPatient._id }, process.env.TOKEN_SECRET);
    res.status(201).json({ user: newPatient, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message.data });
  }
};
module.exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getCart = async (req, res) => {
  const { uid } = req.user;
  try {
    const patient = await Patient.findById(uid).populate(
      "cart.product",
      "name price brand picture"
    );
    if (!patient) {
      return res.status(404).send("User not found");
    }
    res.json(patient.cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.addToCart = async (req, res) => {
  try {
    const { uid } = req.user;
    const { productId, quantity = 1 } = req.body;
    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(400)
        .send("Invalid product ID, please provide a valid product ID");
    if (!productId)
      return res
        .status(400)
        .send("Missing required fields : product, quantity");
    // Find the patient by ID
    let patient = await Patient.findById(uid).select("cart");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Check if the product is already in the cart
    const existingItem = patient.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update quantity if product exists in cart
      existingItem.quantity += quantity || 1;
    } else {
      // Add new product to cart
      patient.cart.push({ product: productId, quantity: quantity || 1 });
    }

    // Save patient document
    await patient.save();

    return res
      .status(200)
      .json({ message: "Product added to cart", cart: patient.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.removeCart = async (req, res) => {
  const { uid } = req.user;
  const { productId } = req.body;

  try {
    // Fetch user with cart field only
    const user = await userModel.findById(uid).select("cart");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find index of product in cart
    const index = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );
    if (index < 0)
      return res.status(404).json({ message: "Product not found in cart" });

    // Remove item
    user.cart.splice(index, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
