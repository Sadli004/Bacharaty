const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true, min: Date.now() },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  notes: { type: String },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
