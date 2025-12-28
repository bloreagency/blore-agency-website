"use client"

import Link from "next/link"
import { Mail, Phone, Twitter, Linkedin, Instagram, Facebook } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center space-x-3 rtl:space-x-reverse">
              <span className="text-2xl font-bold">BLORE AGENCY</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
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
            <h3 className="text-white font-semibold mb-6">{t('footer.quick_links')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  {t('navigation.services')}
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  {t('navigation.work')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t('footer.services')}</h3>
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
            <h3 className="text-white font-semibold mb-6">{t('footer.contact_info')}</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">info@bloreagency.com</span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">+20 120 294 4459</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-cyan-400/20 rounded-lg border border-purple-500/30">
              <h4 className="text-white font-medium mb-2">{t('footer.ready_to_start')}</h4>
              <p className="text-gray-300 text-sm mb-3">{t('footer.lets_discuss')}</p>
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-cyan-600 transition-all duration-300"
              >
                {t('footer.get_in_touch')}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© {currentYear} Blore Agency. {t('footer.all_rights')}</p>
        </div>
      </div>
    </footer>
  )
}
