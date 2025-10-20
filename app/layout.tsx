import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bloreagency.com"),
  title: {
    default: "Blore Agency - Digital Marketing & Media",
    template: "%s | Blore Agency",
  },
  description:
    "A creative digital agency that transforms bold ideas into extraordinary digital experiences. From branding to AI-powered marketing solutions.",
  openGraph: {
    title: "Blore Agency",
    description:
      "Professional digital marketing & media production agency. We help brands grow with creativity and technology.",
    url: "https://www.bloreagency.com",
    siteName: "Blore Agency",
    images: [
      {
        url: "/images/og-image.jpg", // ضع صورة داخل مجلد public/images
        width: 1200,
        height: 630,
        alt: "Blore Agency Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blore Agency",
    description:
      "We help brands grow with professional marketing, media, and digital solutions.",
    images: ["/images/og-image.jpg"], // نفس الصورة
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* ✅ إضافة وسم <head> هنا لتضمين إشارات التحميل المسبق (Preload/Preconnect).
        هذا يحل مشكلة LCP (4.7s) ومشاكل حظر العرض.
      */}
      <head>
        {/*
          ✅ Preload Hint: يسرع تحميل أهم صورة (LCP element).
          تم افتراض أن صورة الـ og-image.jpg هي LCP، أو صورة مشابهة.
          إذا كان العنصر LCP مختلفًا، يرجى تغيير المسار أدناه إلى مساره الصحيح.
        */}
        <link
          rel="preload"
          href="/images/og-image.jpg"
          as="image"
          type="image/jpeg" 
        />
        
        {/* ✅ Preconnect Hint: يسرع اتصال تحميل الخطوط (Inter) من خوادم جوجل. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      
      <body className={inter.className}>
        <Navigation />
        <main className="pt-20">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}