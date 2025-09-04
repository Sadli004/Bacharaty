const router = require("express").Router();
const patientController = require("./patient.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
router.post("/", patientController.signup);
router.get("/", patientController.getAllPatients);
router.get("/cart", checkAccess, patientController.getCart);
router.post("/cart/add", checkAccess, patientController.addToCart);
router.delete(
  "/cart/delete/:productId",
  checkAccess,
  patientController.removeCart
);

module.exports = router;
