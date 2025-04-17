// socket-io.js
import { io } from "socket.io-client";
let socket;

export const connectSocket = (token, userId) => {
  socket = io(`${process.env.EXPO_PUBLIC_API_URL}`, {
    auth: {
      token,
    },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("✅ Connected to socket.io");
    socket.emit("join", userId); // now userId is defined
  });

  return socket;
};

export const getSocket = () => socket;
