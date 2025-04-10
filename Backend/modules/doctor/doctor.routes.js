const router = require("express").Router();
const doctorController = require("./doctor.controller");
//Routes
router.post("/", doctorController.createDoctor);
router.get("/", doctorController.getDoctorsList);
router.get("/:id", doctorController.getDoctorById);

module.exports = router;
