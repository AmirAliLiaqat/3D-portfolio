import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import {
  ProfileDetails,
  CompanyDetails,
  Service,
  Experience,
  Education,
  Project,
  Blog,
  Testimonial,
  ContactInquiry,
  Skill,
} from "../models/PortfolioData.js";
import { protect } from "../middleware/auth.js";
import { sendNotificationEmail } from "../config/nodemailer.js";
import { upload } from "../config/cloudinary.js";
import connectDB from "../config/db.js";

const router = express.Router();

// Helper to sign JWT
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "default_jwt_secret_key_12345";
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

// ==========================================
// 1. PUBLIC ROUTES
// ==========================================

// GET /api/portfolio - Fetch all portfolio data in one call
router.get("/portfolio", async (req, res) => {
  try {
    await connectDB();

    const profile = await ProfileDetails.findOne().sort({ createdAt: -1 });
    const company = await CompanyDetails.findOne().sort({ createdAt: -1 });
    const services = await Service.find().sort({ createdAt: 1 });
    const skills = await Skill.find().sort({ createdAt: 1 });
    const experiences = await Experience.find().sort({ createdAt: -1 });
    const education = await Education.find().sort({ createdAt: -1 });
    const projects = await Project.find().sort({ createdAt: -1 });
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        details: profile,
        companyDetails: company,
        services,
        skills,
        experiences,
        education,
        projects,
        blogs,
        testimonials,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/contact - Submit contact inquiry (Save + Nodemailer email)
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide name, email, and message" });
    }

    // Save inquiry to MongoDB Atlas
    const inquiry = new ContactInquiry({ name, email, message });
    await inquiry.save();

    // Send email notification via Nodemailer SMTP
    const emailResult = await sendNotificationEmail({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      emailStatus: emailResult,
      inquiry,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/auth/login - Admin Login
router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Username and password required" });
    }

    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }],
    });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(admin._id),
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/me - Verify Token
router.get("/auth/me", protect, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// POST /api/upload - Upload Image to Cloudinary
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }
    res.json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. PROTECTED ADMIN CRUD ROUTES
// ==========================================

// Profile Details Update
router.put("/admin/profile", protect, async (req, res) => {
  try {
    let profile = await ProfileDetails.findOne();
    if (profile) {
      profile = await ProfileDetails.findByIdAndUpdate(profile._id, req.body, {
        new: true,
      });
    } else {
      profile = await ProfileDetails.create(req.body);
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Company Details Update
router.put("/admin/company", protect, async (req, res) => {
  try {
    let company = await CompanyDetails.findOne();
    if (company) {
      company = await CompanyDetails.findByIdAndUpdate(company._id, req.body, {
        new: true,
      });
    } else {
      company = await CompanyDetails.create(req.body);
    }
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Projects CRUD
router.post("/admin/projects", protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/admin/projects/:id", protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/admin/projects/:id", protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Blogs CRUD
router.post("/admin/blogs", protect, async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/admin/blogs/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/admin/blogs/:id", protect, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Services CRUD
router.post("/admin/services", protect, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/admin/services/:id", protect, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/admin/services/:id", protect, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Experience CRUD
router.post("/admin/experience", protect, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/admin/experience/:id", protect, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/admin/experience/:id", protect, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Education CRUD
router.post("/admin/education", protect, async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json({ success: true, data: edu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/admin/education/:id", protect, async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data: edu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/admin/education/:id", protect, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Education deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Contact Inquiries for Admin
router.get("/admin/contact-inquiries", protect, async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
