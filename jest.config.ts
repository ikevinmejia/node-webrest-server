/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test

  collectCoverage: true,
  coverageDirectory: "coverage",

  preset: "ts-jest",
  testEnvironment: "node", // Es suficiente con "node"
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "ts", "json"],
  // Asegúrate de que esto detecte archivos .ts
  testMatch: ["**/**/*.test.ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
