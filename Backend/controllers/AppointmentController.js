const { isValidObjectId } = require("mongoose");
const Appointment = require("../models/Appointment");
module.exports.createAppointment = (req, res) => {
  const { patient, doctor, date, time } = req.body;
  if (!patient || !doctor || !date || !time)
    return res.status(400).json({ error: "All fields are required" });
  if (!isValidObjectId(patient) || !isValidObjectId(doctor))
    return res.status(400).json({ error: "Invalid id" });
  const newAppointment = new Appointment({ patient, doctor, date, time });
  newAppointment
    .save()
    .then((appointment) => res.json(appointment))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Failed to create appointment" + err.message })
    );
};

module.exports.getAppointmentList = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getAppointmentsByUser = async (req, res) => {
  const { uid } = req.user;
  try {
    const appointments = await Appointment.find({ patient: uid });
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getAppointmentsForDoctor = async (req, res) => {
  const { uid } = req.user;
  try {
    const appointments = await Appointment.find({ doctor: uid })
      .select("-doctor")
      .populate("patient", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ error: "Invalid Id" });
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ error: "Invalid Id" });
    await Appointment.findByIdAndDelete(id);
    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
