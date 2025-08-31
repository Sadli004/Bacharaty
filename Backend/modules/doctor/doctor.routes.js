const router = require("express").Router();
const {
  createDoctor,
  getDoctorsList,
  getDocSchedule,
  updateWorkingHours,
  makeAvailable,
  addExceptions,
  editException,
  makeUnavailable,
  getDoctorById,
  deleteException,
} = require("./doctor.controller");
const { checkAccess } = require("../../middleware/authMiddlware");
//Routes
router.post("/", createDoctor);
router.get("/", getDoctorsList);
router.get("/schedule/:doctorId", getDocSchedule);
router.put("/workingHours", checkAccess, updateWorkingHours);
router.put("/workingDays", checkAccess, makeAvailable);
router.put("/workingDays/exceptions", checkAccess, addExceptions);
router.put("/workingDays/exceptions/update", checkAccess, editException);
router.delete("/workingDays/exceptions/delete", checkAccess, deleteException);
router.delete("/workingDays", checkAccess, makeUnavailable);
router.get("/:id", getDoctorById);
module.exports = router;
