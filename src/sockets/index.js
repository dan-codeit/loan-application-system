import { Server } from "socket.io";

export const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  // Store connected sockets if needed
  const connectedSockets = new Map();

  io.on("connection", (socket) => {
    console.log("🟢 WebSocket connected:", socket.id);
    console.log("Current connected sockets:", [...io.sockets.sockets.keys()]);
    connectedSockets.set(socket.id, socket);

    socket.on("disconnect", () => {
      console.log("🔴 WebSocket disconnected:", socket.id);
      connectedSockets.delete(socket.id);
    });

    socket.on("test-message", (msg) => {
      console.log("Received test-message:", msg);
      socket.emit("test-reply", `Server received: ${msg}`);
    });
  });

  // Method to send to a specific client by ID
  const sendToClient = (socketId, message) => {
    const clientSocket = connectedSockets.get(socketId);
    if (clientSocket) {
      clientSocket.emit("private-message", message);
      console.log(`Sent private message to ${socketId}: ${message}`);
    } else {
      console.log(`Socket ID ${socketId} not connected.`);
    }
  };

  // Attach helper method to io instance
  io.sendToClient = sendToClient;

  return io;
};

// export const setupWebSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("🟢 WebSocket connected:", socket.id);

//     .. Listen for 'test-message' from this socket
//     socket.on("test-message", (msg) => {
//       console.log("Received test-message:", msg);
//       .. Echo back only to sender (or use io.emit for all)
//       socket.emit("test-reply", `Server received: ${msg}`);
//     });
//   });

//   return io;
// };
