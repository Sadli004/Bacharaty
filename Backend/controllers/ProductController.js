const productModel = require("../models/Product");

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
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};
