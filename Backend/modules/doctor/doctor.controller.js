const Doctor = require("../../models/Doctor");
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
