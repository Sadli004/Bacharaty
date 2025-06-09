const productController = require("./product.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
const router = require("express").Router();
router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/like/", checkAccess, productController.likeProduct);
router.delete("/like/:productId", checkAccess, productController.unlikeProduct);
module.exports = router;
