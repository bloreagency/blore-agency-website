import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/LanguageContext"
import BottomNav from "@/components/mobile/BottomNav"
import { GoogleAnalytics, GoogleTagManager } from "@/components/analytics"
import { OrganizationSchema, WebSiteSchema } from "@/components/structured-data"
import { FacebookPixel, LinkedInInsightTag, MicrosoftClarity } from "@/components/marketing-pixels"
import { SkipToMain } from "@/components/accessibility"
import { PWAInstaller } from "@/components/pwa-installer"
import CursorTrail from "@/components/effects/CursorTrail"
import ScrollProgress from "@/components/effects/ScrollProgress"
import LoadingScreen from "@/components/effects/LoadingScreen"
import AIChatbot from "@/components/AIChatbot"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bloreagency.com"),
  title: {
    default: "Blore Agency - Digital Marketing & Creative Solutions",
    template: "%s | Blore Agency",
  },
  description:
    "Transform your brand with Blore Agency. We offer digital marketing, web development, branding, UI/UX design, and AI-powered solutions across Saudi Arabia, Egypt, and UAE.",
  keywords: [
    "digital marketing agency",
    "web development",
    "branding agency",
    "UI/UX design",
    "mobile app development",
    "AI marketing",
    "Saudi Arabia",
    "Egypt",
    "UAE",
    "creative agency",
    "social media marketing"
  ],
  authors: [{ name: "Blore Agency" }],
  creator: "Blore Agency",
  publisher: "Blore Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Blore Agency - Digital Marketing & Creative Solutions",
    description:
      "Transform your brand with cutting-edge digital marketing, web development, and AI-powered solutions. Trusted by leading brands across MENA region.",
    url: "https://www.bloreagency.com",
    siteName: "Blore Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blore Agency - Digital Marketing & Creative Solutions",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blore Agency - Digital Marketing & Creative Solutions",
    description:
      "Transform your brand with cutting-edge digital marketing, web development, and AI-powered solutions.",
    creator: "@bloreagency_eg",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.bloreagency.com",
    languages: {
      'en': 'https://www.bloreagency.com',
      'ar': 'https://www.bloreagency.com/ar',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    // يمكن إضافة verification codes أخرى هنا
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.variable} ${cairo.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="blore-theme"
          forcedTheme="dark"
        >
          <GoogleAnalytics />
          <GoogleTagManager />
          <FacebookPixel />
          <LinkedInInsightTag />
          <MicrosoftClarity />
          <LoadingScreen />
          <CursorTrail />
          <ScrollProgress />
          <LanguageProvider>
            <SkipToMain />
            <Navigation />
            <main id="main-content" className="pt-20 pb-20 md:pb-0">{children}</main>
            <Footer />
            <BottomNav />
            <PWAInstaller />
            <AIChatbot />
            <SpeedInsights />
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}