const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { StreamChat } = require("stream-chat");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token provided"));

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return next(new Error("Invalid token"));
    socket.user = decoded;
    next();
  });
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);
  });

  socket.on("send-message", ({ chatId, message, receiverId }) => {
    console.log(message);
    const receiverSocketId = onlineUsers.get(receiverId);
    console.log(receiverSocketId);
    if (receiverSocketId) {
      console.log(receiverId);
      io.to(receiverSocketId).emit("new-message", { chatId, message });
    }
  });
  // Handle message updates
  socket.on("update-message", ({ message, receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message-updated", message);
    }
  });

  // Handle message deletions
  socket.on("delete-message", ({ messageId, receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message-deleted", messageId);
    }
  });
  socket.on("disconnect", () => {
    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB and routes
const connDb = require("./config/db");
connDb();

app.use("/user", require("./modules/user/user.routes"));
app.use("/product", require("./modules/product/product.routes"));
app.use("/doctor", require("./modules/doctor/doctor.routes"));
app.use("/patient", require("./modules/patient/patient.routes"));
app.use("/appointment", require("./modules/appointment/appointment.routes"));
app.use("/chat", require("./modules/chat/chat.routes"));
app.use("/download", require("./modules/files/files.routes"));

//Strem token generating
const client = StreamChat.getInstance(
  process.env.STREAM_KEY,
  process.env.STREAM_API_SECRET
);
app.use("/video-token", (req, res) => {
  const { userId } = req.query;
  const id = String(userId);
  const token = client.createToken(id);
  res.json({ token });
});
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
