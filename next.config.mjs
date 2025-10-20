/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 💡 الحل: إزالة AVIF والاحتفاظ فقط بـ WebP لتقليل الضغط على خادم البناء
    formats: ['image/webp'], 
  },
}

export default nextConfig;