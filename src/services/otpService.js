import crypto from "crypto";

export function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

export function isOTPExpired(expiry) {
  return new Date() > new Date(expiry);
}
