import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Twitter, Linkedin, Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center space-x-3">
              <Image src="/images/blore-logo-white.png" alt="Blore Agency Logo" width={40} height={40} />
              <span className="text-2xl font-bold">BLORE AGENCY</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Where creativity meets technology. We craft digital experiences that inspire, engage, and drive measurable
              results for businesses worldwide.
            </p>
            {/* --- الروابط المحدثة هنا --- */}
            <div className="flex space-x-4">
              <a href="https://m.facebook.com/bloreagency.EG/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/bloreagency_eg?t=CjizSyZnxEAoVmKXW_HQew&s=09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/bloreagency/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/bloreagency.eg/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Branding & Graphic Design</span>
              </li>
              <li>
                <span className="text-gray-400">Web Design & Development</span>
              </li>
              <li>
                <span className="text-gray-400">Mobile Applications</span>
              </li>
              <li>
                <span className="text-gray-400">Motion Graphics & Video</span>
              </li>
              <li>
                <span className="text-gray-400">Social Media Marketing</span>
              </li>
              <li>
                <span className="text-gray-400">AI-Powered Marketing Tools</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">info@bloreagency.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">+20 120 294 4459</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-lg border border-purple-500/30">
              <h4 className="text-white font-medium mb-2">Ready to Start?</h4>
              <p className="text-gray-300 text-sm mb-3">Let's discuss your project today.</p>
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-cyan-600 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Blore Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}