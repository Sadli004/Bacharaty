const multer = require("multer");
const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// ⚡ Use `multer` to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[0];
    let folder = "uploads"; // Default

    if (fileType === "image" || fileType === "video") {
      folder = "chat_media";
    } else if (fileType === "audio") {
      folder = "chat_audio";
    }

    // Ensure folder exists
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ⚡ Function to manually store file in GridFS
async function uploadToGridFS(filePath, filename, bucketName) {
  const conn = mongoose.connection;
  const bucket = new GridFSBucket(conn.db, { bucketName });

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const uploadStream = bucket.openUploadStream(filename);

    readStream
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        fs.unlinkSync(filePath); // Delete file from local storage
        resolve(uploadStream.id);
      });
  });
}

module.exports = { upload, uploadToGridFS };
