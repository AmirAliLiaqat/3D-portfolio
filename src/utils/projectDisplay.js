// Display-layer project data, kept in sync with the DesignsToDeploy projects page.
// Nothing here touches the database or any existing image file:
// - every matched project shows the DesignsToDeploy title, description, tagline,
//   highlights, technologies, live link and (for apps) screenshot gallery;
// - the project named "All In One Media" is shown as OmniToolkit;
// - Rewardly is appended as a new Mobile project;
// - a project with no live URL gets no Live Demo button, so nothing ever opens
//   about:blank. Project categories are intentionally left as they are in the
//   database so the existing MERN / Mobile / WordPress filters keep working.
// The admin pages use the raw database projects and are intentionally untouched.

import omnitoolkitFeature from "../assets/projects/feature/omnitoolkit.png";
import rewardlyFeature from "../assets/projects/feature/rewardly-feature.jpg";
import ralliyFeature from "../assets/projects/feature/ralliy-feature.jpg";
import ralliy_1 from "../assets/projects/feature/gallery/ralliy-1.jpg";
import ralliy_2 from "../assets/projects/feature/gallery/ralliy-2.jpg";
import ralliy_3 from "../assets/projects/feature/gallery/ralliy-3.jpg";
import devutils_premium_1 from "../assets/projects/feature/gallery/devutils-premium-1.jpg";
import devutils_premium_2 from "../assets/projects/feature/gallery/devutils-premium-2.jpg";
import devutils_premium_3 from "../assets/projects/feature/gallery/devutils-premium-3.jpg";
import devutils_premium_4 from "../assets/projects/feature/gallery/devutils-premium-4.jpg";
import devutils_premium_5 from "../assets/projects/feature/gallery/devutils-premium-5.jpg";
import splentra_shot_1 from "../assets/projects/feature/gallery/splentra-shot-1.png";
import splentra_shot_2 from "../assets/projects/feature/gallery/splentra-shot-2.png";
import splentra_shot_3 from "../assets/projects/feature/gallery/splentra-shot-3.png";
import splentra_shot_4 from "../assets/projects/feature/gallery/splentra-shot-4.png";
import splentra_shot_5 from "../assets/projects/feature/gallery/splentra-shot-5.png";
import dengueguard_premium_1 from "../assets/projects/feature/gallery/dengueguard-premium-1.jpg";
import dengueguard_premium_2 from "../assets/projects/feature/gallery/dengueguard-premium-2.jpg";
import dengueguard_premium_3 from "../assets/projects/feature/gallery/dengueguard-premium-3.jpg";
import dengueguard_premium_4 from "../assets/projects/feature/gallery/dengueguard-premium-4.jpg";
import dengueguard_premium_5 from "../assets/projects/feature/gallery/dengueguard-premium-5.jpg";
import plantify_premium_1 from "../assets/projects/feature/gallery/plantify-premium-1.jpg";
import plantify_premium_2 from "../assets/projects/feature/gallery/plantify-premium-2.jpg";
import plantify_premium_3 from "../assets/projects/feature/gallery/plantify-premium-3.jpg";
import plantify_premium_4 from "../assets/projects/feature/gallery/plantify-premium-4.jpg";
import plantify_premium_5 from "../assets/projects/feature/gallery/plantify-premium-5.jpg";
import rewardly_premium_1 from "../assets/projects/feature/gallery/rewardly-premium-1.jpg";
import rewardly_premium_2 from "../assets/projects/feature/gallery/rewardly-premium-2.jpg";
import rewardly_premium_3 from "../assets/projects/feature/gallery/rewardly-premium-3.jpg";
import rewardly_premium_4 from "../assets/projects/feature/gallery/rewardly-premium-4.jpg";
import rewardly_premium_5 from "../assets/projects/feature/gallery/rewardly-premium-5.jpg";

const TAG_COLORS = ["blue-text-gradient", "green-text-gradient", "pink-text-gradient"];

const toTags = (techs) =>
  techs.map((name, i) => ({ name, color: TAG_COLORS[i % TAG_COLORS.length] }));

const isLiveUrl = (u) => typeof u === "string" && /^https?:\/\//.test(u);

const DETAILS = {
  "plantify mobile app": {"description": "Plantify is a comprehensive app designed to help users manage their gardens, buy plants, and diagnose plant diseases. It effectively combines a modern e-commerce platform with a smart garden planner and an AI-powered disease detection system.", "tagline": null, "categoryLabel": "Garden & Plant Care App", "highlights": [], "technologies": ["React Native", "JavaScript", "TypeScript", "Tailwind CSS"], "liveUrl": "http://206.189.193.179/", "gallery": [plantify_premium_1, plantify_premium_2, plantify_premium_3, plantify_premium_4, plantify_premium_5]},
  "dengueguard": {"description": "A professional-grade, high-end AI-Driven Dengue Detection and Knowledge-Based Expert System (KBS). This project integrates statistical Machine Learning with a rule-based inference engine to provide a state-of-the-art diagnostic assistant.", "tagline": "AI-driven dengue detection powered by a knowledge-based expert system.", "categoryLabel": "AI Health Diagnostic App", "highlights": ["Statistical machine learning models", "Rule-based inference engine", "Diagnostic assistant workflow"], "technologies": ["Python", "Flask", "React Native", "JavaScript", "Hugging Face"], "liveUrl": "https://dengueguard-privacy.netlify.app/", "gallery": [dengueguard_premium_1, dengueguard_premium_2, dengueguard_premium_3, dengueguard_premium_4, dengueguard_premium_5]},
  "splentra": {"description": "Splentra is a modern, production-ready, fintech-inspired mobile expense splitting application designed to help roommates, coworkers, and friends divide bills, log transactions, and simplify outstanding debts.", "tagline": "Split bills, log transactions, and settle debts with friends and roommates.", "categoryLabel": "Expense Sharing App", "highlights": ["Bill splitting for roommates, coworkers, and friends", "Transaction logging", "Simplified outstanding-debt tracking"], "technologies": ["React Native", "Tailwind CSS", "MongoDB", "JavaScript", "Node.js", "Express.js"], "liveUrl": "https://splentra-backend.vercel.app/privacy", "gallery": [splentra_shot_1, splentra_shot_2, splentra_shot_3, splentra_shot_4, splentra_shot_5]},
  "devutils": {"description": null, "tagline": "15+ offline-first developer utilities in one native mobile app.", "categoryLabel": "Developer Tools", "highlights": ["15+ offline-first developer utilities", "Native iOS and Android builds", "Granular tool toggling with a unified dark/light design system"], "technologies": ["React Native", "JavaScript", "TypeScript", "Tailwind CSS", "Netlify"], "liveUrl": "https://devutils-privacy.netlify.app/", "gallery": [devutils_premium_1, devutils_premium_2, devutils_premium_3, devutils_premium_4, devutils_premium_5]},
  "prepmaster": {"description": "A professional, scalable, and secure full-stack test preparation platform. This project features a Next.js 15 frontend, a FastAPI Python service, and a comprehensive DevOps suite for DigitalOcean deployment.", "tagline": "A secure, scalable full-stack test preparation platform.", "categoryLabel": "Test Preparation Platform", "highlights": ["Next.js 15 frontend with a FastAPI Python service", "Secure and scalable architecture", "DigitalOcean DevOps deployment suite"], "technologies": ["Next.js", "FastAPI", "MongoDB", "Tailwind CSS"], "liveUrl": "https://prepmaster-mock.vercel.app/"},
  "campus hub": {"description": "Campus Hub is a student management system (SMS) designed to enhance campus life and communication, providing tools for student engagement and academic management.", "tagline": null, "categoryLabel": "Student Management System", "highlights": [], "technologies": ["React", "MongoDB", "Tailwind CSS", "Node.js"], "liveUrl": "https://campus-sms.vercel.app/"},
  "campus core": {"description": "Campus Core is an advanced institutional management system that streamlines administrative tasks, student records, and academic workflows for educational institutions.", "tagline": "Institutional management for records, admin tasks, and academic workflows.", "categoryLabel": "Institutional Management System", "highlights": ["Student records management", "Streamlined administrative tasks", "Academic workflow tools"], "technologies": ["React", "MongoDB", "Tailwind CSS", "Express.js"], "liveUrl": "https://campus-core-frontend.vercel.app/"},
  "nexkind": {"category": "Professional", "description": "Nexkind is a modern web application designed to provide innovative digital solutions, featuring a sleek user interface and robust backend architecture.", "tagline": null, "categoryLabel": "Web Application", "highlights": [], "technologies": ["React", "MongoDB", "Tailwind CSS", "Node.js"], "liveUrl": "https://nexkind.vercel.app/"},
  "coffee shop": {"description": "A coffee shop website built with Next.js, React, and Tailwind CSS.", "tagline": null, "categoryLabel": "Website", "highlights": [], "technologies": ["Next.js", "React", "Tailwind CSS"], "liveUrl": "https://leads-fyp.vercel.app"},
  "fixonic": {"category": "Professional", "description": "Fixonic is a professional service marketplace connecting users with expert technicians for various repair needs, featuring a seamless booking and tracking system.", "tagline": null, "categoryLabel": "Service Marketplace", "highlights": [], "technologies": ["React", "MongoDB", "Tailwind CSS", "Express.js"], "liveUrl": "https://fixonic.vercel.app/"},
  "mcclg - college website": {"description": "MC College is an educational institute website built with React, Vite, and Bootstrap 5.", "tagline": null, "categoryLabel": "Educational Website", "highlights": [], "technologies": ["React", "Vite", "Bootstrap 5"], "liveUrl": "https://mcclg.vercel.app"},
  "sports arena": {"description": "A sports-themed web application built with React, Vite, and Tailwind CSS.", "tagline": null, "categoryLabel": "Web Application", "highlights": [], "technologies": ["React", "Vite", "Tailwind CSS"], "liveUrl": "https://sports-arena-eight.vercel.app"},
  "soar task manager": {"description": "A web application built with React, Vite, and Tailwind CSS.", "tagline": null, "categoryLabel": "Web Application", "highlights": [], "technologies": ["React", "Vite", "Tailwind CSS"], "liveUrl": "https://soar-task-react.vercel.app"},
  "all in one media": {"category": "Professional", "description": "OmniToolkit is a full-stack, production-ready all-in-one web productivity platform with 124 tools across PDF processing, image editing, video downloading, calculators, and utilities. Most tools run entirely in the browser, while a Node.js and Express backend with a Python FastAPI microservice powers accounts, video downloads, URL shortening, and document conversion.", "tagline": "Every tool you need, all in one place.", "categoryLabel": "All-in-One Tools Platform", "highlights": ["124 tools across PDF, image, video, calculator, AI, and government service categories", "20+ PDF and office tools powered by a Python FastAPI microservice", "Video downloaders, URL shortener, AI resume builder, and GitHub and LinkedIn profile extractors", "Free and Pro accounts with OTP sign-in and a full admin dashboard"], "technologies": ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Python", "FastAPI"], "liveUrl": "https://omnitoolkit.vercel.app/", "name": "OmniToolkit"},
  "barber shop": {"description": "A complete and responsive barber shop template built with the MERN stack, with a clean, attractive user experience and interface.", "tagline": null, "categoryLabel": "Website Template", "highlights": [], "technologies": ["HTML5", "CSS3", "Bootstrap 5", "React"], "liveUrl": "https://barber-shop-tau-three.vercel.app/"},
  "ums - university management system": {"description": "UMS is a complete and fully featured student management system with various modules and features.", "tagline": null, "categoryLabel": "Student Management System", "highlights": [], "technologies": ["React", "Next.js", "MUI", "Node.js", "Express.js", "MongoDB"], "liveUrl": "https://mern-lms-with-dashboard-client.vercel.app"},
  "richmond institute": {"description": "A website for Richmond Institute, showcasing its strengths and inviting prospective students to explore the opportunities available.", "tagline": null, "categoryLabel": "Educational Institute Website", "highlights": [], "technologies": ["WordPress", "Elementor"], "liveUrl": "https://richmondinstitute.pk"},
  "cache store": {"description": "Cache Store is a full-featured online mobile accessories store, spanning multiple categories like earbuds, handsfree kits, and mobile chargers.", "tagline": null, "categoryLabel": "E-commerce Store", "highlights": [], "technologies": ["WordPress", "Elementor", "WooCommerce"], "liveUrl": "https://cachestore.likesyou.org"},
  "waveslines": {"description": "Waveslines is an e-commerce services provider company offering products across all seasons and varieties.", "tagline": null, "categoryLabel": "E-commerce Store", "highlights": [], "technologies": ["WordPress", "Elementor"], "liveUrl": "https://weavelinens.com/"},
  "warraich traders": {"description": "Warraich Traders is a housing society management system used for buying houses and managing housing materials.", "tagline": null, "categoryLabel": "Housing Society Management", "highlights": [], "technologies": ["HTML5", "CSS3", "Bootstrap 5", "WordPress", "PHP", "MySQL", "React"], "liveUrl": "https://warraich-traders-react.vercel.app/"},
  "mehar herbals": {"description": "Mehar Herbals is an e-commerce site providing a wide variety of herbal products to fulfill your herbal needs.", "tagline": "E-commerce storefront for a wide range of herbal products.", "categoryLabel": "E-commerce Store", "highlights": ["Full herbal product catalog", "WooCommerce-powered store", "Responsive shopping experience"], "technologies": ["HTML5", "CSS3", "Bootstrap 5", "WordPress", "PHP", "WooCommerce"], "liveUrl": "http://meharherbals.likesyou.org/"},
  "byte ki duniya": {"description": "Byte Ki Duniya is an IT services provider company that provides all the ultimate solutions for your business.", "tagline": null, "categoryLabel": "IT Services Website", "highlights": [], "technologies": ["HTML5", "CSS3", "Bootstrap 5", "WordPress", "PHP", "MySQL"], "liveUrl": "http://byte.likesyou.org/"},
  "plantify mern app": {"category": "Professional", "description": "Plantify is a comprehensive plant care and disease detection platform that helps users identify plant health issues and provides expert recommendations for treatment.", "tagline": null, "categoryLabel": "Plant Care Platform", "highlights": [], "technologies": ["React", "MongoDB", "Tailwind CSS", "Node.js"], "liveUrl": null},
  "devbrains software house": {"description": "DevBrains is an IT Services Provider Company that provides many services like Web Development, Graphic development, and many more.", "tagline": null, "categoryLabel": "WordPress Corporate Website", "highlights": [], "technologies": ["WordPress", "Elementor", "React"], "liveUrl": "http://devbrains.likesyou.org/"},
  "bytebunch software house": {"description": "ByteBunch is an IT Services Provider Company that provides many services like Web Development, Graphic development, and many more.", "tagline": null, "categoryLabel": "IT Services Website", "highlights": [], "technologies": ["HTML5", "CSS3", "Bootstrap 5", "WordPress", "PHP", "MySQL"], "liveUrl": "https://amiraliliaqat.github.io/ByteBunch-Html/"},
};

const REWARDLY = {
  name: "Rewardly",
  category: "Mobile",
  description: "Rewardly is a rewards app where users watch rewarded video ads and earn coins that land instantly in a secure balance. Every reward is validated on the server with idempotent transactions, daily limits and cooldowns, so each coin is earned fairly and counted exactly once.",
  tagline: "Watch. Earn. Redeem.",
  categoryLabel: "Rewards & AdMob Earnings App",
  highlights: ["Rewarded AdMob video ads with instant coin credits", "Server-side reward validation with idempotency, daily limits and cooldown protection", "Daily check-in and milestone tasks that keep the balance growing", "Activity log with earnings stats, watch time and coin trends", "Admin portal for user management, manual credit and debit, and live app settings", "English and Urdu interface with light and dark themes"],
  tags: toTags(["React Native", "Expo", "TypeScript", "Node.js", "Express", "MongoDB", "Google AdMob", "Zustand", "TanStack Query", "Cloudinary"]),
  image: rewardlyFeature,
  gallery: [rewardly_premium_1, rewardly_premium_2, rewardly_premium_3, rewardly_premium_4, rewardly_premium_5],
  source_code_link: "https://github.com/AmirAliLiaqat",
  source_link: null,
  live_link: null,
};


const RALLIY = {
  name: "Ralliy",
  description:
    "Ralliy is a freelance marketplace built to take the friction out of hiring. Clients describe what they need in plain words or upload files, and AI turns that into structured job posts; freelancers onboard the same way.",
  tagline: "Calm the chaos of hiring.",
  categoryLabel: "Freelance Marketplace",
  category: "Professional",
  highlights: [
    "AI turns plain-word briefs and file uploads into structured job posts",
    "Freelancers onboard the same simple way as clients",
    "Matching engine ranks verified specialists against every brief",
    "Bounties plus fiat and crypto payments",
  ],
  tags: toTags([
    "Next.js",
    "shadcn",
    "Tailwind CSS",
    "Apollo",
    "GraphQL",
    "Nest.js",
    "PostgreSQL",
    "Prisma",
    "AWS Amplify",
    "AWS EC2",
  ]),
  image: ralliyFeature,
  gallery: [ralliy_1, ralliy_2, ralliy_3],
  carousel: true,
  source_code_link: "https://github.com/AmirAliLiaqat",
  source_link: "https://staging.ralliy.com/",
  live_link: "https://staging.ralliy.com/",
};

/**
 * Returns the projects as visitors should see them: DesignsToDeploy details and
 * live links applied, All In One Media shown as OmniToolkit, Rewardly appended
 * when absent. The input list is never mutated.
 */
export function getDisplayProjects(projects) {
  if (!Array.isArray(projects)) return projects;
  const mapped = projects.map((project) => {
    const key = String(project?.name || "").trim().toLowerCase();
    const details = DETAILS[key];
    if (!details) {
      const live = isLiveUrl(project?.live_link) ? project.live_link : null;
      return { ...project, source_link: live || project?.source_link || null };
    }
    const live =
      details.liveUrl || (isLiveUrl(project?.live_link) ? project.live_link : null);
    return {
      ...project,
      ...(details.name ? { name: details.name } : {}),
      description: details.description || project.description,
      tags: details.technologies && details.technologies.length ? toTags(details.technologies) : project.tags,
      tagline: details.tagline || null,
      categoryLabel: details.categoryLabel || null,
      ...(details.category ? { category: details.category } : {}),
      ...(details.carousel ? { carousel: true } : {}),
      highlights: details.highlights || [],
      gallery: details.gallery || [],
      source_link: live,
      live_link: live,
    };
  });
  const hasRewardly = mapped.some(
    (project) => String(project?.name || "").trim().toLowerCase() === "rewardly"
  );
  const hasRalliy = mapped.some(
    (project) => String(project?.name || "").trim().toLowerCase() === "ralliy"
  );
  let out = hasRewardly ? mapped : [...mapped, REWARDLY];
  return hasRalliy ? out : [...out, RALLIY];
}

export function hasLiveLink(project) {
  return isLiveUrl(project?.source_link) || isLiveUrl(project?.live_link);
}

export function getLiveLink(project) {
  if (isLiveUrl(project?.source_link)) return project.source_link;
  if (isLiveUrl(project?.live_link)) return project.live_link;
  return null;
}