import { Options } from "tsup";
import packageJson from "./package.json";
import { copyFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const OUTPUT_PATH = resolve("../../.things/things-api");

export default {
  tsconfig: "tsconfig.app.json",
  clean: true,
  noExternal: ["@things/format", "@things/crypto"],
  treeshake: true,
  format: ["cjs"],
  outDir: OUTPUT_PATH,
  onSuccess: () => {
    const withOut = { ...packageJson, dependencies: {} };
    for (const dep in packageJson.dependencies) {
      if (packageJson.dependencies[dep] !== "workspace:*") {
        withOut.dependencies[dep] = packageJson.dependencies[dep];
      }
    }
    writeFileSync(
      `${OUTPUT_PATH}/package.json`,
      JSON.stringify(withOut, null, 2)
    );
    copyFileSync("./Dockerfile", `${OUTPUT_PATH}/Dockerfile`);
  }
} as Options;
