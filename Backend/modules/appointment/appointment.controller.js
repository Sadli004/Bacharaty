const { isValidObjectId } = require("mongoose");
const mongoose = require("mongoose");
const Appointment = require("../../models/Appointment");
module.exports.createAppointment = async (req, res) => {
  const { uid } = req.user;
  const patient = uid;
  const { doctor, date, time } = req.body;
  if (!patient || !doctor || !date || !time)
    return res.status(400).json({ error: "All fields are required" });
  if (!isValidObjectId(patient) || !isValidObjectId(doctor))
    return res.status(400).json({ error: "Invalid id" });
  const existant = await Appointment.findOne({
    doctor: doctor,
    date: date,
    time: time,
  });
  if (existant) return res.status(409).send("Appointment already taken");
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
    const appointments = await Appointment.find({ patient: uid }).select(
      "-patient"
    );
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getAppointmentsForDoctor = async (req, res) => {
  const { uid } = req.user;
  try {
    // const appointments = await Appointment.find({ doctor: uid })
    //   .select("-doctor")
    //   .populate("patient", "name");
    const appointments = await Appointment.aggregate([
      {
        $match: { doctor: new mongoose.Types.ObjectId(uid) },
      },
      {
        $lookup: {
          from: "users",
          localField: "patient",
          foreignField: "_id",
          as: "patient",
        },
      },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          time: 1,
          patient: "$patient.name",
          status: 1,
        },
      },
    ]);
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getAppointmentsPerDayForDoctor = async (req, res) => {
  const { date } = req.body;
  const { uid } = req.user;
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const appointments = await Appointment.find({
      doctor: uid,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
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
