// src/routes/socketTest.js
import express from "express";
const router = express.Router();

router.post("/notify-all", (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: "Missing message" });

  // Get io instance from app (set in app.js)
  const io = req.app.get("io");
  if (!io) return res.status(500).json({ error: "Socket.io not initialized" });

  io.emit("bruno-message", message); // emit to all connected clients
  console.log("Message emitted:", message);

  return res.json({ status: "Notification sent to all clients" });
});

export default router;
