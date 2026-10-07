// Maps portfolio project names to their official app icons (served from /public/apps).
// Used by project cards and detail pages so mobile apps render their real icon
// centered on the card (app-store style) instead of a wide cover photo.

const APP_ICONS = {
  "dengueguard": "/apps/dengueguard-icon.png",
  "plantify mobile app": "/apps/plantify-icon.png",
  "devutils": "/apps/devutils-icon.png",
  "splentra": "/apps/splentra-icon.png",
};

/**
 * Returns the local app-icon path for a project name, or null when the
 * project has no dedicated app icon. Matching is case-insensitive on the
 * full project name, so "Plantify MERN App" (web) is NOT matched.
 */
export function getAppIcon(projectName) {
  if (!projectName) return null;
  return APP_ICONS[String(projectName).trim().toLowerCase()] || null;
}
