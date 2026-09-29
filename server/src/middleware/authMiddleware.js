import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Authentication required." });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Authentication required." });
    req.user = user;
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required." });
  }
}

export async function optionalProtect(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return next();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch {
    next();
  }
}
