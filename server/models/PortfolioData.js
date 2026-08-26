import mongoose from "mongoose";

const opts = { timestamps: true, bufferCommands: true };

// 1. Profile Details Schema
const profileDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String },
    role: { type: String },
    designations: [{ type: String }],
    description: { type: String },
    about: { type: String },
  },
  opts
);

// 2. Company Details Schema
const companyDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String },
    shortDescription: { type: String },
    fullDescription: { type: String },
    website: { type: String },
    email: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
    location: { type: String },
    logoSquare: { type: String },
    logoBanner: { type: String },
    socials: [
      {
        name: String,
        link: String,
        icon: String,
        color: String,
      },
    ],
    pillars: [
      {
        title: String,
        icon: String,
        description: String,
        gradient: String,
      },
    ],
  },
  opts
);

// 3. Services Schema
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    icon: { type: String },
  },
  opts
);

// 4. Experience Schema
const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company_name: { type: String, required: true },
    icon: { type: String },
    iconBg: { type: String, default: "#383E56" },
    date: { type: String },
    points: [{ type: String }],
  },
  opts
);

// 5. Education Schema
const educationSchema = new mongoose.Schema(
  {
    school: { type: String, required: true },
    degree: { type: String, required: true },
    date: { type: String },
    grade: { type: String },
    desc: { type: String },
    iconBg: { type: String, default: "#383E56" },
    img: { type: String },
  },
  opts
);

// 6. Projects Schema
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    tags: [
      {
        name: String,
        color: String,
      },
    ],
    image: { type: String },
    source_code_link: { type: String },
    live_link: { type: String },
    category: { type: String, default: "MERN" },
  },
  opts
);

// 7. Blogs Schema
const blogSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String },
    image: { type: String },
    gallery: [{ type: String }],
    date: { type: String },
    readTime: { type: String, default: "5 min read" },
    tags: [{ type: String }],
    category: { type: String },
    author: {
      name: { type: String, default: "Amir Ali Liaqat" },
      role: { type: String, default: "Full Stack Engineer" },
      avatar: { type: String },
    },
  },
  opts
);

// 8. Testimonials Schema
const testimonialSchema = new mongoose.Schema(
  {
    testimonial: { type: String, required: true },
    name: { type: String, required: true },
    designation: { type: String },
    company: { type: String },
    image: { type: String },
  },
  opts
);

// 9. Contact Inquiry Schema
const contactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  opts
);

// 10. Skill Schema
const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "Frontend" },
    icon: { type: String },
  },
  opts
);

export const ProfileDetails =
  mongoose.models.ProfileDetails ||
  mongoose.model("ProfileDetails", profileDetailsSchema);

export const CompanyDetails =
  mongoose.models.CompanyDetails ||
  mongoose.model("CompanyDetails", companyDetailsSchema);

export const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export const Education =
  mongoose.models.Education || mongoose.model("Education", educationSchema);

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export const Blog =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

export const ContactInquiry =
  mongoose.models.ContactInquiry ||
  mongoose.model("ContactInquiry", contactInquirySchema);

export const Skill =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);
