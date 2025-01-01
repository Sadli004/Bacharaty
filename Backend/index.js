const express = require("Express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const doctorRoutes = require("./routes/DoctorRoutes");
const appointmentRoutes = require("./routes/AppointmentRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const connDb = require("./config/db");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(
  cors({
    origin: "*",
    credentials: true, // Required for cookies, authorization headers with HTTPS
  })
); // Enable CORS for all routes
app.use(bodyParser.json());
const PORT = 8082;
connDb();
let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
  });
})();
app.get("/download/files/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;

    // Check if file exists
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(fileId) })
      .toArray();
    if (file.length === 0) {
      return res.status(404).json({ error: { text: "File not found" } });
    }

    // set the headers
    res.set("Content-Type", file[0].contentType);
    res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );

    // pipe the stream to the response
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: { text: `Unable to download file`, error } });
  }
});
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/doctor", doctorRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/message", messageRoutes);
app.listen(PORT, (err, res) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
