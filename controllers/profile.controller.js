import { getPlatformService, supportedPlatforms } from "../services/platform.registry.js";

export const getProfile = async (req, res) => {
  const { platform, username } = req.params;
  try {
    const service = getPlatformService(platform);
    const data = await service.getProfile(username);
    res.json({ success: true, data });
  } catch (err) {
    const status = err.message.includes("not found") ? 404 : 400;
    res.status(status).json({ success: false, error: err.message });
  }
};

export const getProblems = async (req, res) => {
  const { platform, username } = req.params;
  try {
    const service = getPlatformService(platform);
    const data = await service.getProblems(username);
    res.json({ success: true, data });
  } catch (err) {
    const status = err.message.includes("not found") ? 404 : 400;
    res.status(status).json({ success: false, error: err.message });
  }
};

export const getContest = async (req, res) => {
  const { platform, username } = req.params;
  try {
    const service = getPlatformService(platform);
    const data = await service.getContest(username);
    res.json({ success: true, data });
  } catch (err) {
    const status = err.message.includes("not found") ? 404 : 400;
    res.status(status).json({ success: false, error: err.message });
  }
};

export const getPlatforms = (req, res) => {
  res.json({ success: true, supported: supportedPlatforms });
};