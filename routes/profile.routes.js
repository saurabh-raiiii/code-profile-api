import { Router } from "express";
import { getProfile, getProblems, getContest, getPlatforms } from "../controllers/profile.controller.js";

const router = Router();

// GET /platforms  →  list all supported platforms
router.get("/", getPlatforms);

// Validate platform name in URL — only allow registered platform slugs
// Add new platforms here as the registry grows e.g. (leetcode|geeksforgeeks|codeforces)
const platformParam = ":platform(leetcode|geeksforgeeks)";

router.get(`/${platformParam}/:username`, getProfile);
router.get(`/${platformParam}/:username/problems`, getProblems);
router.get(`/${platformParam}/:username/contest`, getContest);

export default router;