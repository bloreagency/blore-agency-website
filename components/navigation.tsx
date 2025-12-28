"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const translations = {
  en: {
    home: "Home",
    about: "About",
    services: "Services",
    work: "Our Work",
    contact: "Contact",
    letsTalk: "Let's Talk",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    work: "أعمالنا",
    contact: "اتصل بنا",
    letsTalk: "تواصل معنا",
  },
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const navContainerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/services", label: t.services },
    { href: "/work", label: t.work },
    { href: "/contact", label: t.contact },
  ]

  // iOS 26 inspired indicator animation
  useEffect(() => {
    const activeItem = navContainerRef.current?.querySelector(`[data-href="${pathname}"]`) as HTMLElement
    if (activeItem && indicatorRef.current && navContainerRef.current) {
      const navRect = navContainerRef.current.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()

      indicatorRef.current.style.width = `${itemRect.width}px`
      indicatorRef.current.style.left = `${itemRect.left - navRect.left}px`
      indicatorRef.current.style.opacity = '1'
    }
  }, [pathname, language])

  return (
    <nav
      className={`fixed top-2 left-2 right-2 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-500/20'
        : 'bg-black/20 backdrop-blur-2xl border border-white/10 shadow-xl shadow-purple-500/10'
        } rounded-2xl`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse group z-10">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-cyan-300 transition-all duration-300 drop-shadow-lg">
              BLORE AGENCY
            </span>
          </Link>

          {/* Desktop Navigation with iOS 26 style */}
          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
            {/* Navigation Items Container */}
            <div
              ref={navContainerRef}
              className={`relative flex items-center space-x-1 rtl:space-x-reverse rounded-full p-1 backdrop-blur-md transition-all duration-300 ${isScrolled
                ? 'bg-white/10 border border-white/20'
                : 'bg-white/5 border border-white/10'
                }`}
              style={{
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              }}
            >
              {/* Animated Indicator (iOS 26 style with glass) */}
              <div
                ref={indicatorRef}
                className="absolute h-8 rounded-full shadow-lg transition-all duration-500 ease-out opacity-0 z-0 bg-white/20 backdrop-blur-md border border-white/30"
                style={{
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                }}
              />

              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  data-href={item.href}
                  href={item.href}
                  className={`relative z-10 text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-full ${pathname === item.href
                    ? "text-purple-300 scale-105 font-semibold"
                    : "text-gray-300 hover:text-white hover:scale-105"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 rounded-full transition-all duration-300 hover:bg-white/10 border border-white/20 backdrop-blur-md"
                >
                  <Globe className="h-4 w-4 text-gray-300" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[100px] bg-black/80 backdrop-blur-xl border-white/20">
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-purple-500/20' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('ar')}
                  className={language === 'ar' ? 'bg-purple-500/20' : ''}
                >
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-600 text-white rounded-full px-5 py-2 ml-2 rtl:ml-0 rtl:mr-2 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 font-semibold text-sm h-9"
            >
              <Link href="/contact">{t.letsTalk}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 z-10 ${isScrolled
              ? 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
              : 'text-white dark:text-gray-300 hover:text-purple-400 dark:hover:text-purple-400'
              }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden py-4 border-t transition-all duration-300 rounded-b-2xl ${isScrolled
            ? 'border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90'
            : 'border-white/20 dark:border-gray-700/30 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl'
            }`}>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-300 px-4 py-3 rounded-xl ${pathname === item.href
                    ? "text-purple-600 dark:text-purple-400 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 scale-105 font-semibold"
                    : isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400"
                      : "text-white/90 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800 hover:text-white"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="w-full"
                >
                  <Globe className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {language === 'en' ? 'العربية' : 'English'}
                </Button>
              </div>

              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-600 text-white rounded-full px-6 w-fit shadow-lg shadow-purple-500/30"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/contact">
                  {t.letsTalk}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
