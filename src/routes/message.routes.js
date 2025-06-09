import express from "express";

const router = express.Router();

router.post("/send-private", (req, res) => {
  const { socketId, message } = req.body;
  const io = req.app.get("io");

  if (!socketId || !message) {
    return res.status(400).json({ error: "socketId and message required" });
  }

  io.sendToClient(socketId, message);

  res.json({ status: `Message sent to ${socketId}` });
});

router.post("/send-to-all", (req, res) => {
  const { message } = req.body;
  const io = req.app.get("io");

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  io.emit("private-message", message);

  res.json({ status: "Message sent to all clients" });
});

router.post("/send-to-room", (req, res) => {
  const { room, message } = req.body;
  const io = req.app.get("io");

  if (!room || !message) {
    return res.status(400).json({ error: "Room and message required" });
  }

  io.to(room).emit("private-message", message);

  res.json({ status: `Message sent to room ${room}` });
});

router.get("/connected-sockets", (req, res) => {
  const io = req.app.get("io");
  const socketIds = Array.from(io.sockets.sockets.keys());
  res.json({ connectedSockets: socketIds });
});

export default router;
