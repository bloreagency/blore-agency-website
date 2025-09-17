import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <body className={inter.className}>
        <Navigation />
        <main className="pt-20">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}