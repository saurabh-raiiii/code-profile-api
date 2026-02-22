import https from "https";
import { BasePlatformService } from "../base.service.js";

const GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        realName
        countryName
        school
      }
      tagProblemCounts {
        advanced { tagName tagSlug problemsSolved }
        intermediate { tagName tagSlug problemsSolved }
        fundamental { tagName tagSlug problemsSolved }
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
    userContestRankingHistory(username: $username) {
      attended
      rating
    }
    userProfileUserQuestionProgressV2(userSlug: $username) {
      numAcceptedQuestions { count difficulty }
      userSessionBeatsPercentage { difficulty percentage }
      totalQuestionBeatsPercentage
    }
  }
`;

function fetchRaw(username) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: GRAPHQL_QUERY, variables: { username } });

    const options = {
      hostname: "leetcode.com",
      path: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Referer: `https://leetcode.com/u/${username}/`,
        Origin: "https://leetcode.com",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.errors)
            return reject(new Error(json.errors[0]?.message ?? "GraphQL error"));
          if (!json.data?.matchedUser)
            return reject(new Error(`User '${username}' not found on LeetCode`));
          resolve(json.data);
        } catch (e) {
          reject(new Error(`Failed to parse LeetCode response: ${e.message}`));
        }
      });
    });

    req.on("error", (e) => reject(new Error(`Network error: ${e.message}`)));
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error("LeetCode request timed out after 20s"));
    });

    req.write(body);
    req.end();
  });
}

function formatData(data, username) {
  const mu = data.matchedUser ?? {};
  const profile = mu.profile ?? {};
  const contestRanking = data.userContestRanking ?? {};
  const contestHistory = data.userContestRankingHistory ?? [];
  const progress = data.userProfileUserQuestionProgressV2 ?? {};
  const numAccepted = progress.numAcceptedQuestions ?? [];
  const beats = progress.userSessionBeatsPercentage ?? [];
  const tagCounts = mu.tagProblemCounts ?? {};

  const maxRating = Math.max(
    ...contestHistory.filter((h) => h.attended).map((h) => h.rating),
    0
  );

  const mapTopics = (arr) =>
    (arr ?? []).map((t) => ({
      topic: t.tagName,
      slug: t.tagSlug,
      problemsSolved: t.problemsSolved,
    }));

  return {
    platform: "leetcode",
    username: mu.username ?? username,
    name: profile.realName ?? "",
    ranking: profile.ranking ?? null,
    country: profile.countryName ?? null,
    school: profile.school ?? null,
    problemsSolved: {
      easy: numAccepted.find((x) => x.difficulty === "EASY")?.count ?? 0,
      medium: numAccepted.find((x) => x.difficulty === "MEDIUM")?.count ?? 0,
      hard: numAccepted.find((x) => x.difficulty === "HARD")?.count ?? 0,
      total: numAccepted.reduce((s, x) => s + (x.count ?? 0), 0),
    },
    beatsPercentage: {
      easy: beats.find((x) => x.difficulty === "EASY")?.percentage ?? null,
      medium: beats.find((x) => x.difficulty === "MEDIUM")?.percentage ?? null,
      hard: beats.find((x) => x.difficulty === "HARD")?.percentage ?? null,
      overall: progress.totalQuestionBeatsPercentage ?? null,
    },
    contest: {
      currentRating: contestRanking.rating ? Math.round(contestRanking.rating) : null,
      maxRating: maxRating ? Math.round(maxRating) : null,
      globalRanking: contestRanking.globalRanking ?? null,
      totalParticipants: contestRanking.totalParticipants ?? null,
      topPercentage: contestRanking.topPercentage ?? null,
      attendedCount: contestRanking.attendedContestsCount ?? 0,
    },
    topicWise: {
      advanced: mapTopics(tagCounts.advanced),
      intermediate: mapTopics(tagCounts.intermediate),
      fundamental: mapTopics(tagCounts.fundamental),
    },
  };
}

class LeetCodeService extends BasePlatformService {
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
      beatsPercentage: p.beatsPercentage,
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

export default new LeetCodeService();