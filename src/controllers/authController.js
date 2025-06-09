import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateOTP, isOTPExpired } from "../services/otpService.js";
import { sendVerificationEmail } from "../services/emailService.js";
import { Op } from "sequelize";

const EMAIL_SECRET = process.env.EMAIL_VERIFICATION_SECRET;

export const signup = async (req, res) => {
  const { email, phone, password } = req.body;
  if (!email || !phone || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  // Check if user already exists by email or phone (optional but recommended)
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
  });
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User with email or phone already exists" });
  }

  // Generate OTP and expiry time for phone verification
  const otp = generateOTP();
  const otpExpiresAt = new Date(
    Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES) || 10) * 60000
  );

  // Create user with OTP and expiry stored
  const user = await User.create({ email, phone, password, otp, otpExpiresAt });

  // Generate email verification token for email verification
  const token = jwt.sign({ email }, EMAIL_SECRET, { expiresIn: "1h" });

  // Send verification email (you can log the OTP here for dev)
  await sendVerificationEmail(email, token);
  console.log(`OTP for phone verification for ${phone}: ${otp}`);
  console.log(`Email verification token for ${email}: ${token}`);

  res.status(201).json({
    message: "Signup successful. Verify email and phone.",
    userId: user.id,
  });
};

export const verifyPhone = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ where: { phone } });
  if (!user) return res.status(404).json({ error: "User not found" });

  if (user.isPhoneVerified) {
    return res
      .status(400)
      .json({ error: "Your phone number has already been verified." });
  }

  // OTP not expired, verify normally
  if (user.otp !== otp || isOTPExpired(user.otpExpiresAt)) {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }

  // OTP correct, mark phone as verified
  user.isPhoneVerified = true;
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  res.json({ message: "Phone verified successfully" });
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, EMAIL_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    user.isEmailVerified = true;
    await user.save();
    res.json({ message: "Email verified" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  if (!user.isEmailVerified || !user.isPhoneVerified) {
    return res
      .status(403)
      .json({ error: "Verify email and phone before logging in" });
  }
  req.session.userId = user.id;
  res.json({ message: "Login successful" });
};

export const logout = (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
};
