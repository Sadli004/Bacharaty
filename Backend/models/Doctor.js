const { Schema, default: mongoose } = require("mongoose");
const User = require("./User");
const DoctorSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  feePerConsultation: {
    type: String,
    required: true,
  },
  availability: {
    start: { type: String, default: "9:00" },
    end: { type: String, default: "17:00" },
    duration: { type: Number, default: 30 },
  },
  schedule: { type: mongoose.Types.ObjectId, ref: "Schedule" },
});
const Doctor = User.discriminator("Doctor", DoctorSchema);
module.exports = Doctor;
