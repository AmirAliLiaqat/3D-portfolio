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
  Skill,
} from "../models/PortfolioData.js";

import { profileSeedData } from "./profile.js";
import { companySeedData } from "./company.js";
import { servicesSeedData } from "./services.js";
import { experiencesSeedData } from "./experiences.js";
import { educationSeedData } from "./education.js";
import { projectsSeedData } from "./projects.js";
import { testimonialsSeedData } from "./testimonials.js";
import { blogsSeedData } from "./blogs.js";
import { skillsSeedData } from "./skills.js";
import { processSeedImages } from "./cloudinaryHelper.js";

// ─── Helper: Seed a single-document collection ────────────────────
const seedSingleDocument = async (Model, data, label, subFolder) => {
  const count = await Model.countDocuments();
  if (count === 0) {
    const processedData = await processSeedImages(data, ["image", "img", "logoSquare", "logoBanner"], subFolder);
    await Model.create(processedData);
    console.log(`  ✅ [Seed] ${label} — seeded 1 document`);
    return true;
  }
  console.log(`  ⏭️  [Seed] ${label} — already has ${count} document(s), skipping`);
  return false;
};

// ─── Helper: Seed a multi-document collection ─────────────────────
const seedCollection = async (Model, dataArray, label, subFolder) => {
  const count = await Model.countDocuments();
  if (count === 0 && dataArray.length > 0) {
    const processedData = await processSeedImages(dataArray, ["image", "img", "icon", "logo"], subFolder);
    await Model.insertMany(processedData);
    console.log(`  ✅ [Seed] ${label} — seeded ${dataArray.length} documents`);
    return true;
  }
  console.log(`  ⏭️  [Seed] ${label} — already has ${count} document(s), skipping`);
  return false;
};

// ─── Main Auto-Seed Runner ────────────────────────────────────────
export const runAllSeeds = async () => {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║       🌱 DATABASE AUTO-SEED RUNNER       ║");
  console.log("╚══════════════════════════════════════════╝\n");

  try {
    // ── 1. Admin User ──────────────────────────────────────────
    console.log("── Admin User ──");
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminEmail = process.env.ADMIN_EMAIL || "designstodeploy@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

    const existingAdmin = await Admin.findOne({
      $or: [{ username: adminUsername }, { email: adminEmail }],
    });

    if (!existingAdmin) {
      const newAdmin = new Admin({
        username: adminUsername,
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log(`  ✅ [Seed] Admin — created user "${adminUsername}"`);
    } else {
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log(`  ⏭️  [Seed] Admin — synced user "${existingAdmin.username}" credentials`);
    }

    // ── 2. Profile Details ─────────────────────────────────────
    console.log("── Profile Details ──");
    await seedSingleDocument(ProfileDetails, profileSeedData, "ProfileDetails", "profile");

    // ── 3. Company Details ─────────────────────────────────────
    console.log("── Company Details ──");
    await seedSingleDocument(CompanyDetails, companySeedData, "CompanyDetails", "company");

    // ── 4. Services ────────────────────────────────────────────
    console.log("── Services ──");
    await seedCollection(Service, servicesSeedData, "Services", "services");

    // ── 4b. Skills ─────────────────────────────────────────────
    console.log("── Skills ──");
    await seedCollection(Skill, skillsSeedData, "Skills", "skills");

    // ── 5. Experiences ─────────────────────────────────────────
    console.log("── Experiences ──");
    await seedCollection(Experience, experiencesSeedData, "Experiences", "experiences");

    // ── 6. Education ───────────────────────────────────────────
    console.log("── Education ──");
    await seedCollection(Education, educationSeedData, "Education", "education");

    // ── 7. Projects ────────────────────────────────────────────
    console.log("── Projects ──");
    await seedCollection(Project, projectsSeedData, "Projects", "projects");

    // ── 8. Testimonials ────────────────────────────────────────
    console.log("── Testimonials ──");
    await seedCollection(Testimonial, testimonialsSeedData, "Testimonials", "testimonials");

    // ── 9. Blogs ───────────────────────────────────────────────
    console.log("── Blogs ──");
    await seedCollection(Blog, blogsSeedData, "Blogs", "blogs");

    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║   ✅ ALL SEED FILES PROCESSED SUCCESSFULLY  ║");
    console.log("╚══════════════════════════════════════════╝\n");
  } catch (error) {
    console.error("\n❌ [Seed Error]:", error.message);
  }
};
