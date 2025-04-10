const router = require("express").Router();
const patientController = require("./patient.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
router.post("/", patientController.signup);
router.get("/", patientController.getAllPatients);
router.get("/cart", checkAccess, patientController.getCart);
router.post("/cart/add", checkAccess, patientController.addToCart);
router.post("/cart/delete", checkAccess, patientController.removeCart);

module.exports = router;
