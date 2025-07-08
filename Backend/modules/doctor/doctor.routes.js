const router = require("express").Router();
const doctorController = require("./doctor.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
//Routes
router.post("/", doctorController.createDoctor);
router.get("/", doctorController.getDoctorsList);
router.post("/schedule", checkAccess, doctorController.makeSchedule);
router.get("schedule/:doctorId", doctorController.getSchedule);
router.get("/:id", doctorController.getDoctorById);
module.exports = router;
