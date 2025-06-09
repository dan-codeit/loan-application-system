import User from "../models/User.js";
import { generateOTP } from "../services/otpService.js";

// Reusable dev route: Generate OTP for any context (e.g. payment, profile update)
export const sendOtpForContext = async (req, res) => {
  const { userId, context } = req.body;

  if (!userId || !context) {
    return res.status(400).json({ error: "userId and context are required" });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const otp = generateOTP();
  const expiresAt = new Date(
    Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES) || 10) * 60000
  );

  user.otpData = {
    ...user.otpData,
    [context]: { otp, expiresAt },
  };

  await user.save();

  // Console only for development
  console.log(`${context.toUpperCase()} OTP for ${user.phone}: ${otp}`);

  res.json({ message: `OTP generated for ${context}`, otp, expiresAt });
};
