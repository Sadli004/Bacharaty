const mongoose = require("mongoose");
const ScheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workingDays: [{ type: Number }],
  startTime: { type: String, default: "09:00" },
  endTime: { type: String, default: "17:00" },
  slotDuration: { type: Number, default: 30 },
});
const Schedule = new mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
