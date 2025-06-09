// devOnlyRoutes.js or in auth routes (conditionally)
import User from "../models/User.js";
import express from "express";
const router = express.Router();

router.get("/test/get-otp/:userId", async (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ otp: user.otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/test/get-email-token/:email", (req, res) => {
  // Store email tokens somewhere or decode JWT if possible
  res.json({ message: "Check your email for token" });
});

export default router;
