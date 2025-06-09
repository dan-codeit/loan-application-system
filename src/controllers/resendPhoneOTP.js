import User from "../models/User.js";
import { generateOTP } from "../services/otpService.js";

export const resendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone)
    return res.status(400).json({ error: "Phone number is required" });

  const user = await User.findOne({ where: { phone } });
  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.isPhoneVerified) {
    return res
      .status(400)
      .json({ message: "Your phone number has already been verified." });
  }

  const newOtp = generateOTP();
  const newOtpExpiry = new Date(
    Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES) || 10) * 60000
  );

  user.otp = newOtp;
  user.otpExpiresAt = newOtpExpiry;
  await user.save();

  // Send OTP via SMS or your notification service
  console.log(`New OTP for ${phone}: ${newOtp}`);

  res.json({ message: "New OTP sent" });
};
