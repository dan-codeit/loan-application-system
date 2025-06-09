import express from "express";
import {
  signup,
  verifyPhone,
  verifyEmail,
  login,
  logout,
} from "../controllers/authController.js";
import { resendOtp } from "../controllers/resendPhoneOTP.js";
import { otpMiddleware } from "../middlewares/otpMiddleware.js";
import { makePaymentHandler } from "../services/payment.handler.js";

// Example usage in a route

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-phone", verifyPhone);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resend-otp", resendOtp);
router.post("/make-payment", otpMiddleware("payment"), makePaymentHandler);

export default router;
