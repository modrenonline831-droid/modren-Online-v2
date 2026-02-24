/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost', 'vercel.app'],
  },
  reactStrictMode: true,
  output: 'standalone', // بدل export
}

module.exports = nextConfig