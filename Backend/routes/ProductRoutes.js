const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/ProductController");
const router = require("express").Router();

// Create a new product
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
module.exports = router;
