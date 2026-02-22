// Base interface that every platform service must implement.
// When adding a new platform (e.g. GFG), extend this class
// and implement all methods.

export class BasePlatformService {
  // Fetch and return the full formatted profile
  // @param {string} username
  // @returns {Promise<object>}
  async getProfile(username) {
    throw new Error(`getProfile() not implemented for this platform`);
  }

  // Fetch and return problems + beats + topicWise
  // @param {string} username
  // @returns {Promise<object>}
  async getProblems(username) {
    throw new Error(`getProblems() not implemented for this platform`);
  }

  // Fetch and return contest rating summary
  // @param {string} username
  // @returns {Promise<object>}
  async getContest(username) {
    throw new Error(`getContest() not implemented for this platform`);
  }
}
