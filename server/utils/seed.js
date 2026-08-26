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
} from "../models/PortfolioData.js";
import {
  initialProfileDetails,
  initialCompanyDetails,
  initialServices,
  initialExperiences,
  initialEducation,
  initialProjects,
  initialBlogs,
  initialTestimonials,
} from "./initialData.js";

export const autoSeed = async () => {
  try {
    // 1. Auto Check / Create Admin User
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminEmail = process.env.ADMIN_EMAIL || "designstodeploy@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

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
      console.log(`[Auto-Seed] Initial Admin user created (${adminUsername})`);
    } else {
      console.log(`[Auto-Seed] Admin user verified (${existingAdmin.username})`);
    }

    // Helper function to seed collection if empty
    const seedIfEmpty = async (Model, initialData, name) => {
      const count = await Model.countDocuments();
      if (count === 0 && initialData) {
        if (Array.isArray(initialData)) {
          if (initialData.length > 0) {
            // Strip out non-serializable properties if any
            const cleaned = initialData.map((item) => {
              const obj = { ...item };
              // convert image references to string paths if object
              if (typeof obj.icon === "object" && obj.icon !== null) obj.icon = obj.icon.src || "";
              if (typeof obj.image === "object" && obj.image !== null) obj.image = obj.image.src || "";
              if (typeof obj.img === "object" && obj.img !== null) obj.img = obj.img.src || "";
              return obj;
            });
            await Model.insertMany(cleaned);
            console.log(`[Auto-Seed] Seeded ${cleaned.length} items into ${name}`);
          }
        } else {
          const cleanedObj = { ...initialData };
          if (typeof cleanedObj.logoSquare === "object" && cleanedObj.logoSquare !== null) {
            cleanedObj.logoSquare = cleanedObj.logoSquare.src || "";
          }
          if (typeof cleanedObj.logoBanner === "object" && cleanedObj.logoBanner !== null) {
            cleanedObj.logoBanner = cleanedObj.logoBanner.src || "";
          }
          await Model.create(cleanedObj);
          console.log(`[Auto-Seed] Seeded ${name} single document`);
        }
      }
    };

    // 2. Auto Seed Portfolio Collections
    await seedIfEmpty(ProfileDetails, initialProfileDetails, "ProfileDetails");
    await seedIfEmpty(CompanyDetails, initialCompanyDetails, "CompanyDetails");
    await seedIfEmpty(Service, initialServices, "Services");
    await seedIfEmpty(Experience, initialExperiences, "Experiences");
    await seedIfEmpty(Education, initialEducation, "Education");
    await seedIfEmpty(Project, initialProjects, "Projects");
    await seedIfEmpty(Blog, initialBlogs, "Blogs");
    await seedIfEmpty(Testimonial, initialTestimonials, "Testimonials");
  } catch (error) {
    console.error("[Auto-Seed Error]:", error.message);
  }
};
