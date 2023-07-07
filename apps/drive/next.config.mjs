/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.mjs");
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyze = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/drive",
        destination: "/drive/root",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["api.dicebear.com"],
    dangerouslyAllowSVG: true,
  },
};
export default analyze(config);
