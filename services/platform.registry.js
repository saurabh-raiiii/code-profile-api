import leetcodeService from "./platforms/leetcode.service.js";
import gfgService from "./platforms/gfg.service.js";

// ─── Registry ─────────────────────────────────────────────────────────────────
// To add a new platform:
//   1. Create services/platforms/yourplatform.service.js
//   2. Import it here
//   3. Add it to the map below with its URL-friendly name
// That's it — routes and controllers need no changes.

const platforms = {
  leetcode: leetcodeService,
  geeksforgeeks: gfgService,
};

export function getPlatformService(platform) {
  const service = platforms[platform.toLowerCase()];
  if (!service) {
    const supported = Object.keys(platforms).join(", ");
    throw new Error(`Platform '${platform}' not supported. Available: ${supported}`);
  }
  return service;
}

export const supportedPlatforms = Object.keys(platforms);
