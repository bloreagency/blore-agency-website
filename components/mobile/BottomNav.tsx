'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, Mail, User, Menu } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const navItems = [
    { path: '/', icon: Home, labelEn: 'Home', labelAr: 'الرئيسية' },
    { path: '/work', icon: Briefcase, labelEn: 'Work', labelAr: 'أعمالنا' },
    { path: '/about', icon: User, labelEn: 'About', labelAr: 'من نحن' },
    { path: '/contact', icon: Mail, labelEn: 'Contact', labelAr: 'اتصل' },
]

export default function BottomNav() {
    const pathname = usePathname()
    const { language } = useLanguage()

    return (
        <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 md:hidden z-50 safe-area-bottom"
        >
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.path
                    const label = language === 'ar' ? item.labelAr : item.labelEn

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="flex flex-col items-center justify-center flex-1 h-full relative"
                        >
                            <motion.div
                                className="flex flex-col items-center gap-1"
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon
                                    className={`w-5 h-5 transition-colors ${isActive
                                        ? 'text-purple-600 dark:text-purple-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                />
                                <span
                                    className={`text-xs font-medium transition-colors ${isActive
                                        ? 'text-purple-600 dark:text-purple-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    {label}
                                </span>
                            </motion.div>
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </Link>
                    )
                })}
            </div>
        </motion.nav>
    )
}
