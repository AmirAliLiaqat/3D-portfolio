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
import { buildPortfolioContext, getGroqReply, isOnTopic } from "../utils/aiAssistant.js";

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

// POST /api/chat - AI Assistant (Groq powered, grounded in portfolio data)
router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "messages array is required" });
    }

    // Keep payload light & safe: last 12 turns, sanitized roles/content only
    const history = messages
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim() !== ""
      )
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    if (history.length === 0 || history[history.length - 1].role !== "user") {
      return res
        .status(400)
        .json({ success: false, message: "Last message must be from the user" });
    }

    const { text: portfolioContext, name, keywords } = await buildPortfolioContext();

    // Reject anything not plausibly about the portfolio owner BEFORE calling
    // Groq at all, so no tokens are spent on unrelated questions.
    const latestUserMessage = history[history.length - 1].content;
    if (!isOnTopic(latestUserMessage, keywords)) {
      return res.json({
        success: true,
        reply: `I'm just here to help with questions about ${name} — things like services, projects, skills, experience, education, or how to get in touch. Try asking me one of those! 😊`,
        offTopic: true,
      });
    }

    const systemPrompt = `You are the friendly AI assistant embedded in ${name}'s personal 3D portfolio website. You represent ${name} and help visitors (recruiters, clients, collaborators) learn about their services, skills, projects, education, and experience, and guide them on how to get in touch.

Ground every answer strictly in the PORTFOLIO DATA below. If asked something outside this data (unrelated general knowledge, coding help unrelated to ${name}, etc.), politely say you can only help with questions about ${name}'s portfolio and steer the conversation back to relevant topics. Never invent facts, links, prices, or availability that are not in the data.

Speak in a warm, concise, professional tone (2-5 sentences per answer unless a list is clearer). You may use "I" to refer to ${name} when it reads naturally (e.g. "I've worked on..."), since you are their AI representative. When relevant, suggest visitors check the Projects, Services, or Contact sections of the site, or use the contact form to reach out directly. Keep responses in plain text (no markdown headers).

PORTFOLIO DATA:
${portfolioContext}`;

    const groqMessages = [{ role: "system", content: systemPrompt }, ...history];

    const reply = await getGroqReply(groqMessages);

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Chat API error:", error.message);
    if (error.code === "NO_API_KEY") {
      return res.status(503).json({
        success: false,
        message:
          "The AI assistant isn't configured yet. Please use the contact form to reach out instead.",
      });
    }
    res.status(500).json({
      success: false,
      message: "I'm having trouble responding right now. Please try again in a moment.",
    });
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
