//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { composePlugins, withNx }from '@nx/next';
import withBundleAnalyzer from "@next/bundle-analyzer";
import  { PrismaPlugin }from '@prisma/nextjs-monorepo-workaround-plugin'

await import("./env.mjs");

const withAnalyze = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false    
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },    reactStrictMode: true,
    swcMinify: true,
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

const plugins = [
  withNx,
  withAnalyze
];

export default composePlugins(...plugins)(nextConfig);