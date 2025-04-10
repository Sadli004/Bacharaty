const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const User = require("./User");
const PatientSchema = new Schema({
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Patient = User.discriminator("Patient", PatientSchema);
module.exports = Patient;
