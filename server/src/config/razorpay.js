import Razorpay from "razorpay";

const keyId =
  process.env.RAZORPAY_KEY_ID ||
  process.env.razorpay_key_id ||
  process.env.RAZERPAY_KEY_ID ||
  process.env.razerpay_key_id;
const keySecret =
  process.env.RAZORPAY_KEY_SECRET ||
  process.env.razorpay_key_secret ||
  process.env.RAZERPAY_KEY_SECRET ||
  process.env.razerpay_key_secret;

export const razorpayConfigured = Boolean(keyId && keySecret);
export const razorpayKeyId = keyId;
export const razorpay = razorpayConfigured
  ? new Razorpay({ key_id: keyId, key_secret: keySecret })
  : null;
export { keySecret as razorpayKeySecret };
