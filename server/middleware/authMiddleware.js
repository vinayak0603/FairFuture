import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fairfuture_secret");

      const admin = await Admin.findById(decoded.id).select("-password");
      if (!admin) {
        return res.status(401).json({ success: false, message: "Not authorized, admin account not found" });
      }

      req.admin = admin;
      return next();
    } catch (error) {
      console.error("[Auth Middleware Error]:", error.message);
      return res.status(401).json({ success: false, message: "Not authorized, token failed or expired" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, missing bearer token" });
  }
};
