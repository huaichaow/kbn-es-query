/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    testMatch: ['<rootDir>/build-test/**/*.test.js'],
  };
};
