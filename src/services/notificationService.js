import { io } from "../app.js";

// Emit a notification event to a specific user (by socket ID or room)
export function sendNotificationToUser(socketId, message) {
  io.to(socketId).emit("notification", message);
}

// Broadcast to all connected clients
export function broadcastNotification(message) {
  io.emit("notification", message);
}

//import axios from "axios";

export async function sendVerificationSMS(phone, otp) {
  const message = `Your verification code is ${otp}`;
  console.log(message);
  // Example for Termii
  // await axios.post("https://api.ng.termii.com/api/sms/send", {
  //   to: phone,
  //   sms: message,
  //   type: "plain",
  //   channel: "generic",
  //   api_key: process.env.TERMII_API_KEY,
  //   from: "LoanApp",
  // });
}
