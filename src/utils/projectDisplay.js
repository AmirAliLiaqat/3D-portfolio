// Display-layer project changes, applied on top of the database projects.
// Nothing here touches the database or any existing image file:
// - the project currently named "All In One Media" is shown as OmniToolkit,
//   with its title, description, tech tags, live link and feature image
//   taken from the DesignsToDeploy projects page;
// - Rewardly is appended as a new Mobile project, also from the
//   DesignsToDeploy projects page.
// Renaming matches by project NAME (not by list position), so it stays
// correct even if the project order changes. The admin pages use the raw
// database projects and are intentionally untouched.

import omnitoolkitFeature from "../assets/projects/feature/omnitoolkit.png";
import rewardlyFeature from "../assets/projects/feature/rewardly-feature.jpg";

const TAG_COLORS = [
  "text-[#915eff]",
  "text-[#00cea8]",
  "text-[#ff6b6b]",
  "text-[#4da6ff]",
  "text-[#f59e0b]",
  "text-[#a78bfa]",
];

const toTags = (techs) =>
  techs.map((name, i) => ({ name, color: TAG_COLORS[i % TAG_COLORS.length] }));

const OMNITOOLKIT = {
  name: "OmniToolkit",
  category: "MERN",
  description:
    "OmniToolkit is a full-stack, production-ready all-in-one web productivity platform with 124 tools across PDF processing, image editing, video downloading, calculators, and utilities. Most tools run entirely in the browser, while a Node.js and Express backend with a Python FastAPI microservice powers accounts, video downloads, URL shortening, and document conversion.",
  tags: toTags([
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "FastAPI",
  ]),
  image: omnitoolkitFeature,
  source_code_link: "https://github.com/AmirAliLiaqat",
  source_link: "https://omnitoolkit.vercel.app/",
  live_link: "https://omnitoolkit.vercel.app/",
};

const REWARDLY = {
  name: "Rewardly",
  category: "Mobile",
  description:
    "Rewardly is a rewards app where users watch rewarded video ads and earn coins that land instantly in a secure balance. Every reward is validated on the server with idempotent transactions, daily limits and cooldowns, so each coin is earned fairly and counted exactly once.",
  tags: toTags([
    "React Native",
    "Expo",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Google AdMob",
    "Zustand",
    "TanStack Query",
    "Cloudinary",
  ]),
  image: rewardlyFeature,
  source_code_link: "https://github.com/AmirAliLiaqat",
  source_link: "#",
  live_link: "#",
};

/**
 * Returns the projects as visitors should see them: the "All In One Media"
 * entry renamed to OmniToolkit, plus Rewardly appended when it is not
 * already present. The input list is never mutated.
 */
export function getDisplayProjects(projects) {
  if (!Array.isArray(projects)) return projects;
  const renamed = projects.map((project) =>
    String(project?.name || "")
      .trim()
      .toLowerCase() === "all in one media"
      ? { ...project, ...OMNITOOLKIT }
      : project
  );
  const hasRewardly = renamed.some(
    (project) =>
      String(project?.name || "").trim().toLowerCase() === "rewardly"
  );
  return hasRewardly ? renamed : [...renamed, REWARDLY];
}
