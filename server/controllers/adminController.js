import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Helper: Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fairfuture_secret", {
    expiresIn: "7d",
  });
};

// @desc    Admin login & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in admin
// @route   GET /api/admin/me
// @access  Protected (Admin)
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Auto Seed Default Admin Account if None Exists
export const seedDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new Admin({
        name: "Super Admin",
        email: "admin@fairfuture.com",
        password: "Admin@123456",
        role: "superadmin",
      });
      await defaultAdmin.save();
      console.log("--------------------------------------------------");
      console.log("  [Default Admin Seeded Successfully]");
      console.log("  Email: admin@fairfuture.com");
      console.log("  Password: Admin@123456");
      console.log("--------------------------------------------------");
    }
  } catch (error) {
    console.error("[Admin Seeding Error]:", error.message);
  }
};
