const {
  createAppointment,
  getAppointmentsForDoctor,
  cancelAppointment,
  updateAppointment,
  getAppointmentsPerDayForDoctor,
  getAppointmentsByUser,
} = require("./appointment.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
const router = require("express").Router();

router.post("/", checkAccess, createAppointment);
router.get("/doctor", checkAccess, getAppointmentsForDoctor);
router.get("/patient", checkAccess, getAppointmentsByUser);
router.get("/doctor/day", checkAccess, getAppointmentsPerDayForDoctor);
router.patch("/:id", updateAppointment);
router.delete("/:id", cancelAppointment);

module.exports = router;
