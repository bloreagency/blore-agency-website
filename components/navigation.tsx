"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Our Work" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/blore-logo-black.png"
              alt="Blore Agency Logo"
              width={50}
              height={50}
              className="group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
              BLORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-purple-600 ${
                  pathname === item.href ? "text-purple-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-full px-6 ml-4"
            >
              <Link href="/contact">Let's Talk</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-purple-600 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-purple-600 ${
                    pathname === item.href ? "text-purple-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-full px-6 w-fit"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Let's Talk
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
