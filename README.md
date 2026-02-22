# LeetCode Profile API

A lightweight Node.js/Express REST API that scrapes LeetCode's public profile page and returns structured JSON data — **no API key required**, uses only Node.js built-in `https` module + Express.

---

## 🚀 Setup

```bash
npm install
npm start
# Server starts at http://localhost:3000
```

---

## 📡 Endpoints

### `GET /profile/:username`
Returns the **complete** profile.

```bash
curl http://localhost:3000/profile/_logbase2
```

**Response:**
```json
{
  "success": true,
  "data": {
    "username": "_logbase2",
    "name": "saurabh rai",
    "avatar": "https://assets.leetcode.com/...",
    "ranking": 122622,
    "country": "India",
    "school": "Dr. A. P. J. Abdul Kalam Technical University, Lucknow",
    "skills": ["JavaScript", "NodeJS", "ExpressJS", "..."],
    "socialLinks": {
      "github": "https://github.com/saurabh-raiiii",
      "twitter": "https://twitter.com/saurabh_raii",
      "linkedin": "https://linkedin.com/in/saurabh-raiiii"
    },
    "problemsSolved": {
      "easy": 160,
      "medium": 365,
      "hard": 70,
      "total": 595
    },
    "beatsPercentage": {
      "easy": 95.82,
      "medium": 97.99,
      "hard": 94.82,
      "overall": 99.5
    },
    "contest": {
      "currentRating": 1670,
      "maxRating": 1744,
      "globalRanking": 128460,
      "totalParticipants": 839080,
      "topPercentage": 15.61,
      "attendedCount": 15,
      "history": [...]
    },
    "languages": [
      { "language": "C++", "problemsSolved": 549 },
      { "language": "Java", "problemsSolved": 45 },
      { "language": "MySQL", "problemsSolved": 7 }
    ],
    "topicWise": {
      "advanced": [
        { "topic": "Dynamic Programming", "slug": "dynamic-programming", "problemsSolved": 106 },
        { "topic": "Backtracking", "slug": "backtracking", "problemsSolved": 29 }
      ],
      "intermediate": [
        { "topic": "Hash Table", "slug": "hash-table", "problemsSolved": 142 },
        { "topic": "Greedy", "slug": "greedy", "problemsSolved": 77 }
      ],
      "fundamental": [
        { "topic": "Array", "slug": "array", "problemsSolved": 365 },
        { "topic": "String", "slug": "string", "problemsSolved": 142 }
      ]
    },
    "badges": [...],
    "streak": {
      "current": 17,
      "totalActiveDays": 33,
      "activeYears": [2022, 2023, 2024, 2025, 2026]
    },
    "recentSubmissions": [...],
    "activityCalendar": { "2026-02-15": 8, "..." : "..." },
    "communityStats": {
      "views": 12,
      "reputation": -1,
      "solutions": 1,
      "discussions": 0
    }
  }
}
```

---

### `GET /profile/:username/problems`
Problems solved breakdown + topic-wise + language stats.

```bash
curl http://localhost:3000/profile/_logbase2/problems
```

---

### `GET /profile/:username/contest`
Contest rating and history.

```bash
curl http://localhost:3000/profile/_logbase2/contest
```

**Response:**
```json
{
  "success": true,
  "data": {
    "username": "_logbase2",
    "name": "saurabh rai",
    "contest": {
      "currentRating": 1670,
      "maxRating": 1744,
      "globalRanking": 128460,
      "totalParticipants": 839080,
      "topPercentage": 15.61,
      "attendedCount": 15,
      "history": [
        {
          "contest": "Weekly Contest 401",
          "startTime": "2024-06-09",
          "attended": true,
          "problemsSolved": 0,
          "totalProblems": 4,
          "rating": 1670,
          "ranking": 26654,
          "trend": "DOWN"
        }
      ]
    }
  }
}
```

---

### `GET /profile/:username/topics`
Topic-wise (advanced / intermediate / fundamental) problem counts.

```bash
curl http://localhost:3000/profile/_logbase2/topics
```

---

### `GET /health`
Health check.

---

## ⚙️ How It Works

LeetCode embeds all profile data in a `<script id="__NEXT_DATA__">` JSON block inside the HTML page. This API:

1. Fetches `https://leetcode.com/u/:username/` with a browser-like User-Agent
2. Extracts and parses the embedded `__NEXT_DATA__` JSON
3. Transforms the raw data into clean, structured response fields

No external dependencies beyond **Express** — uses Node.js built-in `https` module for the HTTP request.

---

## 🔧 Environment Variables

| Variable | Default | Description         |
|----------|---------|---------------------|
| `PORT`   | `3000`  | Port to listen on   |

```bash
PORT=8080 npm start
```
