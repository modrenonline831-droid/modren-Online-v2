/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['csshlueridnpfqhajmps.supabase.co'], // ✅ مضاف الآن
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128],
    minimumCacheTTL: 86400,
  },
  reactStrictMode: true,
  output: 'standalone',
  compress: true,
  swcMinify: true, // تفعيل التحسين الإضافي
}

module.exports = nextConfig