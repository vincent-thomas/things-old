import { Options } from "tsup";

export default {
  dts: false,
  tsconfig: "tsconfig.app.json",
  clean: true,
  bundle: true,
  external: [],
  treeshake: true,
  format: ["esm"],
  outDir: "./dist"
} as Options;
