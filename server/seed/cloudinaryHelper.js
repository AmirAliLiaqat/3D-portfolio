import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cloudinary } from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");

// Cache uploaded URLs in memory during process run to minimize API calls
const urlCache = new Map();

/**
 * Checks if Cloudinary is properly configured with real credentials
 */
export const isCloudinaryConfigured = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  return (
    Boolean(cloudName) &&
    Boolean(apiKey) &&
    Boolean(apiSecret) &&
    cloudName !== "demo" &&
    cloudName !== "your_cloud_name" &&
    apiKey !== "123456789"
  );
};

/**
 * Recursively search directory for a file matching filename
 */
const findFileRecursive = (dir, filename) => {
  if (!fs.existsSync(dir)) return null;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFileRecursive(fullPath, filename);
      if (found) return found;
    } else if (entry.isFile() && entry.name.toLowerCase() === filename.toLowerCase()) {
      return fullPath;
    }
  }
  return null;
};

/**
 * Resolves local file system path from image relative URL
 */
const resolveLocalFilePath = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string" || imagePath.startsWith("http")) {
    return null;
  }

  const cleanPath = imagePath.replace(/^\//, "");

  // Priority direct candidates
  const candidates = [
    path.join(projectRoot, "src", cleanPath),
    path.join(projectRoot, "public", cleanPath),
    path.join(projectRoot, "src/assets", cleanPath.replace(/^assets\//, "")),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  // Fallback: Recursive search in src/assets and public by filename
  const targetFileName = path.basename(cleanPath);
  if (targetFileName) {
    const searchDirs = [
      path.join(projectRoot, "src/assets"),
      path.join(projectRoot, "public"),
    ];

    for (const searchDir of searchDirs) {
      const found = findFileRecursive(searchDir, targetFileName);
      if (found) return found;
    }
  }

  return null;
};

/**
 * Uploads a local image to Cloudinary if it doesn't already exist.
 * Returns Cloudinary secure_url if successful/exists, otherwise returns original imagePath.
 */
export const uploadSeedImage = async (imagePath, subFolder = "general") => {
  if (!imagePath || typeof imagePath !== "string" || imagePath.startsWith("http")) {
    return imagePath;
  }

  if (urlCache.has(imagePath)) {
    return urlCache.get(imagePath);
  }

  if (!isCloudinaryConfigured()) {
    return imagePath;
  }

  const localFile = resolveLocalFilePath(imagePath);
  if (!localFile) {
    console.warn(`  ⚠️  [Cloudinary] Could not find local file for image: ${imagePath}`);
    return imagePath;
  }

  try {
    // Generate deterministic public_id to check duplication
    const baseName = path.basename(localFile, path.extname(localFile)).toLowerCase().replace(/[^a-z0-9_-]/g, "_");
    const publicId = `portfolio_seed/${subFolder}/${baseName}`;

    // ── STEP 1: FIRST CHECK IF IMAGE ALREADY EXISTS IN CLOUDINARY ──
    try {
      const existingResource = await cloudinary.api.resource(publicId);
      if (existingResource && existingResource.secure_url) {
        console.log(`  ⏭️  [Cloudinary] Existing image found: ${publicId}`);
        urlCache.set(imagePath, existingResource.secure_url);
        return existingResource.secure_url;
      }
    } catch (checkErr) {
      // 404 error from Cloudinary api.resource means image does not exist yet; proceed to upload
    }

    // ── STEP 2: UPLOAD IMAGE TO CLOUDINARY IF NOT FOUND ──
    console.log(`  ☁️  [Cloudinary] Uploading new image: ${path.basename(localFile)} -> ${publicId}`);
    const uploadResult = await cloudinary.uploader.upload(localFile, {
      public_id: publicId,
      overwrite: false,
      resource_type: "auto",
    });

    if (uploadResult && uploadResult.secure_url) {
      console.log(`  ✅ [Cloudinary] Successfully uploaded: ${uploadResult.secure_url}`);
      urlCache.set(imagePath, uploadResult.secure_url);
      return uploadResult.secure_url;
    }
  } catch (uploadErr) {
    console.error(`  ⚠️  [Cloudinary Error] Failed for ${imagePath}:`, uploadErr.message);
  }

  return imagePath;
};

/**
 * Process object or array of objects to replace local image fields with Cloudinary URLs
 */
export const processSeedImages = async (data, imageKeys = ["image", "img", "icon", "logo", "logoSquare", "logoBanner"], subFolder = "general") => {
  if (!data) return data;

  if (Array.isArray(data)) {
    const updatedArray = [];
    for (const item of data) {
      updatedArray.push(await processSeedImages(item, imageKeys, subFolder));
    }
    return updatedArray;
  }

  if (typeof data === "object") {
    const copy = { ...data };
    for (const key of Object.keys(copy)) {
      if (imageKeys.includes(key) && typeof copy[key] === "string") {
        copy[key] = await uploadSeedImage(copy[key], subFolder);
      } else if (typeof copy[key] === "object" && copy[key] !== null) {
        copy[key] = await processSeedImages(copy[key], imageKeys, subFolder);
      }
    }
    return copy;
  }

  return data;
};
