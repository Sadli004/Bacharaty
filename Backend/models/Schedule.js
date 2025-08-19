const mongoose = require("mongoose");
const ScheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workingDays: [{ type: String }],
  workingHours: [
    {
      day: { type: String },
      start: { type: String, default: "8:00" },
      end: { type: String, default: "16:00" },
    },
  ],
  exceptions: [
    {
      date: String,
      start: { type: String, default: "8:00" },
      end: { type: String, default: "16:00" },
      available: Boolean,
    },
  ],
  slotDuration: { type: Number, default: 30 },
});
const Schedule = new mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
