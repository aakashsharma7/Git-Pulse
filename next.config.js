/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },

  reactStrictMode: true,
  // reactStrictMode: false,
};

module.exports = nextConfig;