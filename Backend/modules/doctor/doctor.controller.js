const Doctor = require("../../models/Doctor");
const Schedule = require("../../models/Schedule");
module.exports.createDoctor = async (req, res) => {
  const info = req.body;
  try {
    const newDoctor = new Doctor(info);
    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.getDoctorsList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.makeSchedule = async (req, res) => {
  const doctorId = req.user.uid;
  const { workingDays, startTime, endTime, slotDuration } = req.body;
  try {
    const schedule = await Schedule.findOneAndUpdate({ doctorId }, req.body, {
      upsert: true,
      new: true,
    });
    res.json(schedule);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
// GET /schedule/:doctorId
module.exports.getSchedule = async (req, res) => {
  try {
    const schedule = await DoctorSchedule.findOne({
      doctorId: req.params.doctorId,
    });
    if (!schedule) return res.status(404).send("No schedule found");
    res.json(schedule);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
