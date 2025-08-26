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
  const slotDate = new Date(date);
  const [hours,minutes] = time.split(':').map(Number);
  
  if (slotDate.setHours(hours,minutes,0,0) < new Date()) {
      return res.status(400).json({ message: "Cannot book past dates" });
    }
  const existant = await Appointment.findOne({
    doctor,
    date: slotDate,
    time,
    status: { $in: ["Pending", "Confirmed"] }
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
    const appointments = await Appointment.find({ patient: uid })
      .select("-patient")
      .populate("doctor", "name location");
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports.getAppointmentsForDoctor = async (req, res) => {
  const { uid } = req.user;
  try {
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
  const { date } = req.query;
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
  const { uid } = req.user;

  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: id,
      $or: [{ patient: uid }, { doctor: uid }],
    });

    if (!appointment) {
      return res.status(404).json({
        error:
          "Appointment not found or you don't have permission to cancel it",
      });
    }

    return res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({
      error: "An error occurred while cancelling the appointment",
    });
  }
};
