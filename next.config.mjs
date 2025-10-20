/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // تم حذف السطر القديم: unoptimized: true,
    // تم تفعيل الصيغ الحديثة لتحقيق أقصى ضغط تلقائي
    formats: ['image/webp', 'image/avif'], 
  },
}

export default nextConfig;