/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Optimize for deployment
  output: 'standalone',
  // Handle Puppeteer in serverless environments
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude Puppeteer from serverless bundle (optional optimization)
      config.externals = [...(config.externals || []), 'puppeteer'];
    }
    return config;
  },
};

export default nextConfig;

