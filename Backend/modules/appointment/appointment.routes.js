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
router.patch("/:id", updateAppointment);
router.get("/doctor", checkAccess, getAppointmentsForDoctor);
router.get("/patien", checkAccess, getAppointmentsByUser);
router.get("/doctor/day", checkAccess, getAppointmentsPerDayForDoctor);
router.delete("/:id", cancelAppointment);

module.exports = router;
