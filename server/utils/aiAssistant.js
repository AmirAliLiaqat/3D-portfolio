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

let cachedContext = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

const truncate = (str, max = 220) => {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max)}...` : str;
};

// Generic words that signal a question is about the portfolio owner, even if
// none of their specific names/skills/projects are mentioned by name.
export const GENERIC_TOPIC_WORDS = [
  "project",
  "projects",
  "service",
  "services",
  "skill",
  "skills",
  "experience",
  "work",
  "works",
  "working",
  "job",
  "jobs",
  "career",
  "education",
  "degree",
  "study",
  "studies",
  "studied",
  "university",
  "college",
  "school",
  "contact",
  "email",
  "phone",
  "whatsapp",
  "reach",
  "hire",
  "hiring",
  "available",
  "availability",
  "rate",
  "rates",
  "price",
  "pricing",
  "cost",
  "budget",
  "quote",
  "testimonial",
  "testimonials",
  "review",
  "reviews",
  "client",
  "clients",
  "company",
  "bio",
  "background",
  "tech",
  "technology",
  "technologies",
  "stack",
  "framework",
  "language",
  "languages",
  "achievement",
  "achievements",
  "certificate",
  "certificates",
  "certification",
  "certifications",
  "portfolio",
  "resume",
  "cv",
  "freelance",
  "freelancer",
  "remote",
  "location",
  "based",
  "github",
  "linkedin",
  "social",
  "blog",
  "blogs",
  "article",
  "articles",
  "name",
  "role",
  "designation",
  "expertise",
  "specialize",
  "specialise",
  "specialty",
  "offer",
  "offers",
  "build",
  "built",
  "building",
  "develop",
  "developed",
  "developer",
  "development",
  "app",
  "apps",
  "application",
  "applications",
  "website",
  "websites",
  "web",
  "mobile",
  "amir",
  "designstodeploy",
  "collaborate",
  "collaboration",
  "yourself",
];

const GREETING_START_REGEX =
  /^\s*(hi+|hello+|hey+|heya|yo|salam|assalamu?\s?alaikum|asalam|hola|namaste|good\s?(morning|afternoon|evening|day))\b/i;

const SIMPLE_FILLER_REGEX =
  /^\s*(thanks?|thank\s?you|thankyou|ty|bye|goodbye|ok|okay|cool|nice|great|awesome|sup|what'?s\s?up)[\s!.,?]*$/i;

// Common ways people ask about the assistant/owner's identity, phrased too
// generically to rely on single keyword matches (e.g. "who", "about" alone
// are too broad and false-positive on unrelated questions).
const IDENTITY_QUESTION_REGEX =
  /\b(who\s+are\s+you|what(?:'s|\s+is)\s+your\s+name|what\s+do\s+you\s+do|tell\s+me\s+about\s+(?:yourself|you)|introduce\s+yourself|what\s+can\s+you\s+(?:do|help)|how\s+can\s+you\s+help)\b/i;

const tokenize = (text) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9+.#]+/i)
    .filter((w) => w.length > 2);

// Decides whether a user message is plausibly about the portfolio owner,
// using the dynamic keyword set built from their real data + generic topic
// words. Off-topic messages are rejected BEFORE hitting the Groq API, so no
// tokens are spent on questions unrelated to the portfolio.
export const isOnTopic = (message, keywordSet) => {
  const trimmed = (message || "").trim();
  if (!trimmed) return false;
  if (SIMPLE_FILLER_REGEX.test(trimmed)) return true;
  if (IDENTITY_QUESTION_REGEX.test(trimmed)) return true;

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return true; // e.g. just an emoji/punctuation

  // Short greetings ("Hi", "Hello there!") are always welcomed
  if (tokens.length <= 4 && GREETING_START_REGEX.test(trimmed)) return true;

  return tokens.some((t) => keywordSet.has(t));
};

// Builds a compact text summary of all portfolio data to ground the AI's answers,
// plus a keyword set (derived from the same data) used to filter out off-topic
// questions before they ever reach the Groq API.
export const buildPortfolioContext = async () => {
  const now = Date.now();
  if (cachedContext && now - cachedAt < CACHE_TTL_MS) {
    return cachedContext;
  }

  const [
    profile,
    company,
    services,
    skills,
    experiences,
    education,
    projects,
    blogs,
    testimonials,
  ] = await Promise.all([
    ProfileDetails.findOne().sort({ createdAt: -1 }),
    CompanyDetails.findOne().sort({ createdAt: -1 }),
    Service.find().sort({ createdAt: 1 }),
    Skill.find().sort({ createdAt: 1 }),
    Experience.find().sort({ createdAt: -1 }),
    Education.find().sort({ createdAt: -1 }),
    Project.find().sort({ createdAt: -1 }),
    Blog.find().sort({ createdAt: -1 }),
    Testimonial.find().sort({ createdAt: -1 }),
  ]);

  const name = profile?.name || "Amir Ali Liaqat";
  const lines = [];
  const keywordSet = new Set(GENERIC_TOPIC_WORDS);
  const addKeywords = (text) => {
    if (!text) return;
    tokenize(String(text)).forEach((w) => keywordSet.add(w));
  };

  lines.push(`Name: ${name}`);
  addKeywords(name);
  addKeywords(profile?.shortName);
  if (profile?.role) {
    lines.push(`Role: ${profile.role}`);
    addKeywords(profile.role);
  }
  if (profile?.designations?.length) {
    lines.push(`Also known as: ${profile.designations.join(", ")}`);
    profile.designations.forEach(addKeywords);
  }
  if (profile?.description)
    lines.push(`Summary: ${truncate(profile.description, 500)}`);
  if (profile?.about) lines.push(`About: ${truncate(profile.about, 500)}`);

  if (company?.name) {
    lines.push(
      `\nCompany/Brand: ${company.name}${company.tagline ? ` - ${company.tagline}` : ""}`,
    );
    addKeywords(company.name);
    if (company.shortDescription)
      lines.push(`Company summary: ${truncate(company.shortDescription, 300)}`);
    if (company.website) lines.push(`Website: ${company.website}`);
    if (company.email) lines.push(`Contact email: ${company.email}`);
    if (company.phone) lines.push(`Phone: ${company.phone}`);
    if (company.whatsapp) lines.push(`WhatsApp: ${company.whatsapp}`);
    if (company.location) {
      lines.push(`Location: ${company.location}`);
      addKeywords(company.location);
    }
  }

  if (services?.length) {
    lines.push(`\nServices offered (${services.length}):`);
    services.forEach((s) => {
      lines.push(
        `- ${s.title}${s.category ? ` (${s.category})` : ""}: ${truncate(s.description, 150)}`,
      );
      addKeywords(s.title);
      addKeywords(s.category);
    });
  }

  if (skills?.length) {
    const byCategory = skills.reduce((acc, s) => {
      const cat = s.category || "Other";
      acc[cat] = acc[cat] || [];
      acc[cat].push(s.name);
      return acc;
    }, {});
    lines.push(`\nSkills:`);
    Object.entries(byCategory).forEach(([cat, names]) => {
      lines.push(`- ${cat}: ${names.join(", ")}`);
      addKeywords(cat);
      names.forEach(addKeywords);
    });
  }

  if (experiences?.length) {
    lines.push(`\nWork Experience (${experiences.length}):`);
    experiences.forEach((e) => {
      lines.push(`- ${e.title} at ${e.company_name} (${e.date || "N/A"})`);
      addKeywords(e.title);
      addKeywords(e.company_name);
      (e.points || [])
        .slice(0, 3)
        .forEach((p) => lines.push(`  * ${truncate(p, 150)}`));
    });
  }

  if (education?.length) {
    lines.push(`\nEducation (${education.length}):`);
    education.forEach((ed) => {
      lines.push(
        `- ${ed.degree} at ${ed.school} (${ed.date || "N/A"})${ed.grade ? `, Grade: ${ed.grade}` : ""}`,
      );
      addKeywords(ed.degree);
      addKeywords(ed.school);
      if (ed.desc) lines.push(`  ${truncate(ed.desc, 150)}`);
    });
  }

  if (projects?.length) {
    lines.push(`\nProjects (${projects.length}):`);
    projects.forEach((p) => {
      const tags = (p.tags || []).map((t) => t.name).join(", ");
      lines.push(
        `- ${p.name}${p.category ? ` [${p.category}]` : ""}: ${truncate(p.description, 200)}${
          tags ? ` Tags: ${tags}` : ""
        }`,
      );
      addKeywords(p.name);
      addKeywords(p.category);
      (p.tags || []).forEach((t) => addKeywords(t.name));
    });
  }

  if (blogs?.length) {
    lines.push(`\nArticles (${blogs.length}):`);
    blogs.forEach((blog) => {
      const tags = (blog.tags || []).join(", ");
      lines.push(
        `- ${blog.title}${blog.category ? ` [${blog.category}]` : ""}: ${truncate(
          blog.excerpt || blog.content,
          220,
        )}${tags ? ` Tags: ${tags}` : ""}${blog.date ? ` (${blog.date})` : ""}`,
      );
      addKeywords(blog.title);
      addKeywords(blog.category);
      (blog.tags || []).forEach(addKeywords);
    });
  }

  if (testimonials?.length) {
    lines.push(`\nTestimonials (${testimonials.length}):`);
    testimonials.slice(0, 5).forEach((t) => {
      lines.push(
        `- "${truncate(t.testimonial, 150)}" - ${t.name}${t.designation ? `, ${t.designation}` : ""}${
          t.company ? ` at ${t.company}` : ""
        }`,
      );
    });
  }

  cachedContext = { text: lines.join("\n"), name, keywords: keywordSet };
  cachedAt = now;
  return cachedContext;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Calls Groq's OpenAI-compatible chat completions endpoint.
export const getGroqReply = async (messages) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    const err = new Error("GROQ_API_KEY is not configured on the server.");
    err.code = "NO_API_KEY";
    throw err;
  }

  const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 500,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => "");
    const err = new Error(
      `Groq API request failed (${response.status}): ${errBody}`,
    );
    err.status = response.status;
    throw err;
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error("Groq API returned an empty response.");
  }
  return reply;
};
