const {
  createAppointment,
  getAppointmentsForDoctor,
  cancelAppointment,
  updateAppointment,
} = require("../controllers/AppointmentController");
const { checkAccess } = require("../middleware/authMiddlware");
const router = require("express").Router();

router.post("/", createAppointment);
router.patch("/:id", updateAppointment);
router.get("/doctor", checkAccess, getAppointmentsForDoctor);
router.delete("/:id", cancelAppointment);

module.exports = router;
