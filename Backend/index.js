const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./modules/user/user.routes");
const productRoutes = require("./modules/product/product.routes");
const doctorRoutes = require("./modules/doctor/doctor.routes");
const appointmentRoutes = require("./modules/appointment/appointment.routes");
const filesRoutes = require("./modules/files/files.routes");
const chatRoutes = require("./modules/chat/chat.routes");
const patientRoutes = require("./modules/patient/patient.routes");
const connDb = require("./config/db");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(
  cors({
    origin: "*",
    credentials: true, // Required for cookies, authorization headers with HTTPS
  })
); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;
connDb();
// let bucket;
// (() => {
//   mongoose.connection.on("connected", () => {
//     bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//       bucketName: "chat_media",
//     });
//   });
// })();
// app.get("/download/files/:fileId", async (req, res) => {
//   try {
//     const { fileId } = req.params;

//     // Check if file exists
//     const file = await bucket
//       .find({ _id: new mongoose.Types.ObjectId(fileId) })
//       .toArray();
//     if (file.length === 0) {
//       return res.status(404).json({ error: { text: "File not found" } });
//     }

//     // set the headers
//     res.set("Content-Type", file[0].contentType);
//     res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);

//     // create a stream to read from the bucket
//     const downloadStream = bucket.openDownloadStream(
//       new mongoose.Types.ObjectId(fileId)
//     );

//     // pipe the stream to the response
//     downloadStream.pipe(res);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: { text: `Unable to download file`, error } });
//   }
// });
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/chat", chatRoutes);
app.use("/download", filesRoutes);
app.listen(PORT, (err, res) => {
  if (err) console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
