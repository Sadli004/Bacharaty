const {
  createProduct,
  getProducts,
} = require("../controllers/ProductController");
const router = require("express").Router();

// Create a new product
router.post("/", createProduct);
router.get("/", getProducts);
module.exports = router;
