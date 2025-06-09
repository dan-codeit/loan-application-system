import User from "../models/User.js";
import { isOTPExpired } from "../services/otpService.js";

export const otpMiddleware = (context) => async (req, res, next) => {
  const userId = req.session?.userId || req.body.userId; // fallback for manual test

  //const userId = req.session.userId;
  const { otp } = req.body;
  if (!userId || !otp) {
    return res.status(400).json({ error: "User session or OTP missing" });
  }

  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const otpRecord = user.otpData?.[context];
  if (!otpRecord || isOTPExpired(otpRecord.expiresAt)) {
    return res.status(400).json({ error: "OTP expired or not found" });
  }

  if (otpRecord.otp !== otp) {
    return res.status(400).json({ error: "Incorrect OTP" });
  }

  delete user.otpData[context];
  await user.save();

  next();
};
