import User from "../models/User.js";
import { isOTPExpired } from "../utils/otpUtils.js";

export const emailOtpMiddleware = (context) => async (req, res, next) => {
  const userId = req.session.userId;
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

  if (context === "verifyEmail") {
    user.isEmailVerified = true;
  }

  delete user.otpData[context];
  await user.save();

  next();
};
