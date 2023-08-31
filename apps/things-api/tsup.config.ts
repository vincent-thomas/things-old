import { Options } from "tsup";
import packageJson from "./package.json";
import getLatest from "latest-version";
import { copyFileSync, writeFileSync } from "fs";

export default {
  dts: false,
  tsconfig: "tsconfig.app.json",
  clean: true,
  bundle: true,
  noExternal: ["@things/format", "@things/crypto"],
  treeshake: true,
  format: ["cjs"],
  outDir: "./dist",
  name: "things-api",
  onSuccess() {
    const withOut = { ...packageJson, dependencies: {} };
    for (const dep in packageJson.dependencies) {
      if (packageJson.dependencies[dep] !== "workspace:*") {
        withOut.dependencies[dep] = packageJson.dependencies[dep];
      }
    }
    writeFileSync("./dist/package.json", JSON.stringify(withOut, null, 2));
  }
} as Options;
