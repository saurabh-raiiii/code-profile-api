import { BasePlatformService } from "../base.service.js";

// ─── GFG Service ─────────────────────────────────────────────────────────────
// TODO: implement actual GFG API/scraping logic inside each method.
// The structure below already matches the base interface — just fill in
// fetchRaw() and formatData() similar to leetcode.service.js

function fetchRaw(username) {
  // Example: GFG has a public API at:
  // https://geeks-for-geeks-stats-api.vercel.app/?raw=Y&userName=<username>
  // Replace this with your actual fetch logic
  return Promise.reject(new Error("GFG service not yet implemented"));
}

function formatData(raw, username) {
  // Map GFG raw response fields to the same shape as LeetCode:
  // { platform, username, name, ranking, problemsSolved, beatsPercentage, contest, topicWise }
  return {};
}

class GFGService extends BasePlatformService {
  async getProfile(username) {
    const raw = await fetchRaw(username);
    return formatData(raw, username);
  }

  async getProblems(username) {
    const raw = await fetchRaw(username);
    const p = formatData(raw, username);
    return {
      platform: p.platform,
      username: p.username,
      name: p.name,
      problemsSolved: p.problemsSolved,
      topicWise: p.topicWise,
    };
  }

  async getContest(username) {
    const raw = await fetchRaw(username);
    const p = formatData(raw, username);
    return {
      platform: p.platform,
      username: p.username,
      name: p.name,
      contest: p.contest,
    };
  }
}

export default new GFGService();
