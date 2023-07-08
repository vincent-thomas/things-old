import withBundleAnalyzer from '@next/bundle-analyzer';

await import('./env.mjs');

const withAnalyze = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
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

export default withAnalyze(nextConfig);
