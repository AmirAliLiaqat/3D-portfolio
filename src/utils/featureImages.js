// Feature images matching the DesignsToDeploy /projects feature images
// (laptop + phone template for web projects, 3-phone fan for mobile apps).
// These are ADDITIVE: no existing project image file was removed or replaced.
// When a project has a feature image here, cards and detail pages show it;
// otherwise they fall back to the project's existing image (or app icon).
// The database image values are untouched, so removing this map restores
// the previous display exactly.

import barberShopFeature from "../assets/projects/feature/barber-shop.png";
import omnitoolkitFeature from "../assets/projects/feature/omnitoolkit.png";
import rewardlyFeature from "../assets/projects/feature/rewardly-feature.jpg";
import ralliyFeature from "../assets/projects/feature/ralliy-feature.jpg";
import byteKiDuniyaFeature from "../assets/projects/feature/byte-ki-duniya.png";
import bytebunchFeature from "../assets/projects/feature/bytebunch.png";
import cacheStoreFeature from "../assets/projects/feature/cache-store.png";
import campusCoreFeature from "../assets/projects/feature/campus-core.png";
import campusHubFeature from "../assets/projects/feature/campus-hub.png";
import coffeeShopFeature from "../assets/projects/feature/coffee-shop.png";
import dengueguardFeature from "../assets/projects/feature/dengueguard-feature.jpg";
import devbrainsFeature from "../assets/projects/feature/devbrains.png";
import devutilsFeature from "../assets/projects/feature/devutils-feature.jpg";
import fixonicFeature from "../assets/projects/feature/fixonic.png";
import mcclgFeature from "../assets/projects/feature/mcclg.png";
import meharHerbalsFeature from "../assets/projects/feature/mehar-herbals.png";
import nexkindFeature from "../assets/projects/feature/nexkind.png";
import plantifyAppFeature from "../assets/projects/feature/plantify-feature.jpg";
import plantifyWebFeature from "../assets/projects/feature/plantify-web.png";
import prepmasterFeature from "../assets/projects/feature/prepmaster.png";
import richmondInstituteFeature from "../assets/projects/feature/richmond-institute.png";
import soarTaskFeature from "../assets/projects/feature/soar-task.png";
import splentraFeature from "../assets/projects/feature/splentra-feature.jpg";
import sportsArenaFeature from "../assets/projects/feature/sports-arena.png";
import umsFeature from "../assets/projects/feature/ums.png";
import warraichTradersFeature from "../assets/projects/feature/warraich-traders.png";
import waveslinesFeature from "../assets/projects/feature/waveslines.png";

const FEATURE_IMAGES = {
  "barber shop": barberShopFeature,
  "byte ki duniya": byteKiDuniyaFeature,
  "bytebunch software house": bytebunchFeature,
  "cache store": cacheStoreFeature,
  "campus core": campusCoreFeature,
  "campus hub": campusHubFeature,
  "coffee shop": coffeeShopFeature,
  "dengueguard": dengueguardFeature,
  "devbrains software house": devbrainsFeature,
  "devutils": devutilsFeature,
  "fixonic": fixonicFeature,
  "mcclg - college website": mcclgFeature,
  "mehar herbals": meharHerbalsFeature,
  "nexkind": nexkindFeature,
  "omnitoolkit": omnitoolkitFeature,
  "plantify mern app": plantifyWebFeature,
  "plantify mobile app": plantifyAppFeature,
  "rewardly": rewardlyFeature,
  "ralliy": ralliyFeature,
  "prepmaster": prepmasterFeature,
  "richmond institute": richmondInstituteFeature,
  "soar task manager": soarTaskFeature,
  "splentra": splentraFeature,
  "sports arena": sportsArenaFeature,
  "ums - university management system": umsFeature,
  "warraich traders": warraichTradersFeature,
  "waveslines": waveslinesFeature,
};

/**
 * Returns the feature image for a project name, or null when the project
 * has no matching DesignsToDeploy feature image. Matching is
 * case-insensitive on the full project name.
 */
export function getFeatureImage(projectName) {
  if (!projectName) return null;
  return FEATURE_IMAGES[String(projectName).trim().toLowerCase()] || null;
}
