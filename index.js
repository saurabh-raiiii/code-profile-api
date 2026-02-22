import express from "express";
import profileRoutes from "./routes/profile.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// All profile routes live under /profile
app.use("/", profileRoutes);

// Health check
app.get("/health", (_, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

// 404 fallback
app.use((req, res) =>
  res.status(404).json({
    success: false,
    error: "Route not found",
    availableRoutes: [
      "GET /                              → list supported platforms",
      "GET /:platform/:username           → full profile",
      "GET /:platform/:username/problems  → problems + beats + topics",
      "GET /:platform/:username/contest   → contest summary",
      "GET /health                        → health check",
    ],
  })
);

app.listen(PORT, () => {
  console.log(`\nAPI running at http://localhost:${PORT}\n`);
  console.log(`  GET /                              → supported platforms`);
  console.log(`  GET /:platform/:username           → full profile`);
  console.log(`  GET /:platform/:username/problems  → problems + topics`);
  console.log(`  GET /:platform/:username/contest   → contest summary`);
  console.log(`  GET /health\n`);
});