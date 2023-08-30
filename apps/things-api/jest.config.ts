import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  displayName: "things-api",
  transform: {
    "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }]
  },
  preset: "../../jest.preset.js",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  setupFiles: ["<rootDir>/setupJest.ts"],
  testMatch: ["<rootDir>/e2e/tests/**/*.e2e.ts"],
  verbose: true,
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  forceExit: true
};

export default config;
