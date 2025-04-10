const { Schema, Model } = require("mongoose");
const mongoose = require("mongoose");
const MediaSchema = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  uploader: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});
const AudioSchema = new Schema({
  _id: false,
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
const Media = mongoose.model("Media", MediaSchema);
const Audio = mongoose.model("Audio", AudioSchema);
module.exports = { Media, Audio };
