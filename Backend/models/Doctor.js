const { model, Schema } = require("mongoose");
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
  timings: {
    type: [],
  },
});
const Doctor = User.discriminator("Doctor", DoctorSchema);
module.exports = Doctor;
