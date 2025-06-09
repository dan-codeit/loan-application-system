//node --experimental-specifier-resolution=node test-client.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Connected with socket id:", socket.id);
  socket.emit("test-message", "Hello server from test client");
});

socket.on("test-reply", (msg) => {
  console.log("Reply from server:", msg);
});

// Listen for the notification from /notify-all route
socket.on("bruno-message", (msg) => {
  console.log("Received from server:", msg);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("private-message", (msg) => {
  console.log("Private message from server:", msg);
});
