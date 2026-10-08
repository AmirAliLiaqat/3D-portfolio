// Dynamic XML sitemaps for the 3D portfolio.
//
// Served live from the Express server (deployed as a Vercel serverless function),
// so every blog or project published through the admin panel appears automatically,
// no rebuild or redeploy needed. Standard sitemaps.org format:
//
//   /sitemap.xml         -> sitemap index
//   /sitemap-pages.xml   -> static pages
//   /sitemap-posts.xml   -> dynamic posts (blogs + projects, read from MongoDB)
import express from "express";
import connectDB from "../config/db.js";
import { Blog, Project } from "../models/PortfolioData.js";

const router = express.Router();

const SITE_URL = (process.env.SITE_URL || "https://amiraliliaqat.me").replace(/\/+$/, "");

const escapeXml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toW3CDate = (value) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

const urlEntry = ({ loc, lastmod, changefreq, priority }) =>
  `  <url>\n    <loc>${escapeXml(loc)}</loc>\n` +
  (lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>\n` : "") +
  (changefreq ? `    <changefreq>${changefreq}</changefreq>\n` : "") +
  (priority ? `    <priority>${priority}</priority>\n` : "") +
  `  </url>`;

const urlset = (urls) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(urlEntry).join("\n") +
  `\n</urlset>`;

const sendXml = (res, xml) => {
  res.set("Content-Type", "application/xml; charset=utf-8");
  res.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.send(xml);
};

// Static pages. Admin and API routes are intentionally excluded.
const STATIC_PAGES = [
  { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE_URL}/projects`, changefreq: "weekly", priority: "0.8" },
  { loc: `${SITE_URL}/blogs`, changefreq: "weekly", priority: "0.8" },
];

// --- Sitemap index ---
router.get("/sitemap.xml", (_req, res) => {
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/sitemap-pages.xml`)}</loc>\n  </sitemap>\n` +
    `  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/sitemap-posts.xml`)}</loc>\n  </sitemap>\n` +
    `</sitemapindex>`;
  sendXml(res, xml);
});

// --- Static pages sitemap ---
router.get("/sitemap-pages.xml", (_req, res) => {
  const urls = STATIC_PAGES.map((p) => ({ ...p, lastmod: new Date().toISOString() }));
  sendXml(res, urlset(urls));
});

// --- Dynamic posts sitemap (blogs + projects from MongoDB) ---
router.get("/sitemap-posts.xml", async (_req, res) => {
  try {
    await connectDB();
    const [blogs, projects] = await Promise.all([
      Blog.find({}).select("id title updatedAt createdAt date").sort({ updatedAt: -1 }).lean(),
      Project.find({}).select("updatedAt createdAt").sort({ updatedAt: -1 }).lean(),
    ]);

    const blogUrls = blogs.map((b) => ({
      loc: `${SITE_URL}/blog/${b.id ?? String(b._id)}`,
      lastmod: toW3CDate(b.updatedAt || b.createdAt || b.date),
      changefreq: "monthly",
      priority: "0.7",
    }));

    const projectUrls = projects.map((p) => ({
      loc: `${SITE_URL}/project/${String(p._id)}`,
      lastmod: toW3CDate(p.updatedAt || p.createdAt),
      changefreq: "monthly",
      priority: "0.6",
    }));

    sendXml(res, urlset([...blogUrls, ...projectUrls]));
  } catch (err) {
    console.error("Sitemap posts error:", err.message);
    res
      .status(503)
      .set("Content-Type", "text/plain; charset=utf-8")
      .send("Sitemap temporarily unavailable. Please retry shortly.");
  }
});

export default router;
