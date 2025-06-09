import express from "express";
const router = express.Router();

// Mock login route for development purposes
// This route is intended for development and testing only.
router.post("/dev/mock-login", async (req, res) => {
  const { userId } = req.body;
  req.session.userId = userId;
  res.json({ message: `Session set for user ${userId}` });
});

// Mock logout route for development purposes
router.post("/dev/mock-logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

export default router;
