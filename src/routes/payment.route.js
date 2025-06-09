// src/routes/payment.js

import express from "express";
import { otpMiddleware } from "../middlewares/otpMiddleware.js";
import { makePaymentHandler } from "../controllers/makePayement.controller.js";

const router = express.Router();

// Protected by OTP for context "payment"
router.post("/make-payment", otpMiddleware("payment"), makePaymentHandler);

export default router;
