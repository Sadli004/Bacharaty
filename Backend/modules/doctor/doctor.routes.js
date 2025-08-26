const router = require("express").Router();
const doctorController = require("./doctor.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
//Routes
router.post("/", doctorController.createDoctor);
router.get("/", doctorController.getDoctorsList);
router.get("/schedule/:doctorId", doctorController.getDocSchedule);
router.put("/workingHours", checkAccess, doctorController.updateWorkingHours);
router.get("/:id", doctorController.getDoctorById);
module.exports = router;
