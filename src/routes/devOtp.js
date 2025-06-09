import express from "express";
import { sendOtpForContext } from "../controllers/otpController.js";

const router = express.Router();

router.post("/dev/send-otp", sendOtpForContext);

export default router;
