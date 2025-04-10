const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

const getFileFromGridFS = async (req, res, bucketName) => {
  try {
    const conn = mongoose.connection;
    const bucket = new GridFSBucket(conn.db, { bucketName });
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("error", () => res.status(404).send("File not found"));
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.getChatMedia = (req, res) =>
  getFileFromGridFS(req, res, "chat_media");
module.exports.getChatAudio = (req, res) =>
  getFileFromGridFS(req, res, "chat_audio");
module.exports.getFile = (req, res) =>
  getFileFromGridFS(req, res, "chat_files");
module.exports.getProfilePicture = (req, res) => {
  getFileFromGridFS(req, res, "profile_pictures");
};
