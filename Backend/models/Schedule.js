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
      day: String,
      start: String,
      end: String,
    },
  ],
  slotDuration: { type: Number, default: 30 },
});
const Schedule = new mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
