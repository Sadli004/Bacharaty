const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: String,
  description: String,
  image: String,
  category: String,
  rating: Number,
  numReviews: Number,
  numLikes: Number,
  createdAt: Date,
  updatedAt: Date,
  countInStock: Number,
  sold: Number,
});

module.exports = model("Product", ProductSchema);
