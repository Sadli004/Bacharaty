const router = require("express").Router();
const {
  createDoctor,
  getDoctorsList,
} = require("../controllers/DoctorController");
router.get("/", getDoctorsList);
router.post("/", createDoctor);

module.exports = router;
