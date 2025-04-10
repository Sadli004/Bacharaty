const productController = require("./product.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
const router = require("express").Router();
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/like/", checkAccess, productController.likeProduct);
module.exports = router;
