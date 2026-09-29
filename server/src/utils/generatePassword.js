import crypto from "node:crypto";

export default function generatePassword(length = 6) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    crypto.randomBytes(length),
    (byte) => alphabet[byte % alphabet.length],
  ).join("");
}
