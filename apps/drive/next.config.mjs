import withBundleAnalyzer from '@next/bundle-analyzer';
import { composePlugins, withNx } from '@nx/next';

await import('./env.mjs');

const withAnalyze = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// @type {import('next').NextConfig}
/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 *
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  // output: 'standalone',
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/drive',
        destination: '/drive/root',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['api.dicebear.com'],
    dangerouslyAllowSVG: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withAnalyze,
];

export default composePlugins(...plugins)(nextConfig);
