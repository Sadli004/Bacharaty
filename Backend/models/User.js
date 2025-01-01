const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail],
  },
  phoneNumber: { type: String, validate: [isMobilePhone] },

  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: String,
    enum: ["Doctor", "Patient"],
    default: "Patient",
    required: true,
  },
  chats: [
    {
      receiver: { type: mongoose.Schema.Types.ObjectId, required: true },
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
      },
    },
  ],
});
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");
  return user;
};
module.exports = model("User", UserSchema);
