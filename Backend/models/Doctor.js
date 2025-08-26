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
  workingHours: [
    {
      day: {
        type: String,
        enum: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wedesday",
          "Saturday",
          "Friday",
        ],
      },
      start: { type: String, default: "8:00" },
      end: { type: String, default: "16:00" },
    },
  ],
  exceptions: [
    {
      date: Date,
      start: { type: String, default: "8:00" },
      end: { type: String, default: "16:00" },
      available: Boolean,
    },
  ],
  slotDuration: { type: Number, default: 30 },
});
const Doctor = User.discriminator("Doctor", DoctorSchema);
module.exports = Doctor;
