/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://data-grivy.vercel.app/api/:path*', // Ganti dengan URL API Anda
      },
    ];
  },
};

module.exports = nextConfig;
