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
        type: Number,
        enum: [
          0,//Saturday
          1,//Sunday
          2,//Monday
          3,//Tuesday
          4,//Wednesday
          5,//Thursday
          6,//Friday  
             
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
DoctorSchema.pre("save", function (next) {
  const days = this.workingHours.map(wh => wh.day);
  const uniqueDays = new Set(days);

  if (days.length !== uniqueDays.size) {
    return next(new Error("Duplicate days are not allowed in working hours"));
  }

  next();
});
const Doctor = User.discriminator("Doctor", DoctorSchema);
module.exports = Doctor;
