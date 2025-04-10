const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    media: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    audio: { type: mongoose.Schema.Types.ObjectId, ref: "Audio" },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
