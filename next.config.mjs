/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 🛑 العودة إلى 'unoptimized: true' لإيقاف الفشل
    unoptimized: true,
    
    // 💡 إضافة هذا الإعداد لتوجيه تحسين الصور إلى خادم آخر
    // يمكنك هنا استخدام أي خدمة CDN أو خادم خارجي (مثل Cloudinary, Imgix, إلخ.)
    // إذا كنت تستخدم Vercel Pro/Enterprise، يمكن تركها هكذا لتستخدم Vercel Image Optimizer (إذا كان الدعم مفعلاً)
    // إذا لم يكن لديك خدمة خارجية، سنعتمد على أن الصور تم ضغطها يدوياً مسبقاً.
    remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // السماح بجميع النطاقات البعيدة إذا كنت تستخدم صورًا من مصادر خارجية
        },
    ],
  },
}

export default nextConfig;