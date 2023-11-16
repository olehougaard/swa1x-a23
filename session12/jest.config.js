/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  coverageProvider: "v8",

   moduleFileExtensions: [
     "js",
     "mjs",
     "ts",
     "json",
     "vue"
  ],

  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "babel-jest",
    '^.+\\.vue$': '@vue/vue3-jest'
  },
};
