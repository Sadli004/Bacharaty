const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  startAt: { type: Date,  index: true },
  duration: { type: Number },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  notes: { type: String },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
