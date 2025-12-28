'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'

const Web3Globe = dynamic(() => import('@/components/Web3Globe'), {
    ssr: false,
})

export default function ScrollingGlobe({ isRTL = false }: { isRTL?: boolean }) {
    const [mounted, setMounted] = useState(false)
    const { scrollY } = useScroll()

    // Transform values - larger size and vertical movement
    const scale = useTransform(scrollY, [0, 2000, 4000], [1, 0.8, 0.5])

    // Horizontal movement - stays mostly on edge
    const x = useTransform(
        scrollY,
        [0, 1000, 2000, 3000],
        isRTL ? ['-45%', '-42%', '-40%', '-38%'] : ['45%', '42%', '40%', '38%']
    )

    // Vertical movement - moves down as user scrolls
    const y = useTransform(
        scrollY,
        [0, 500, 1000, 1500, 2000, 2500, 3000],
        ['-50%', '-40%', '-30%', '-20%', '-10%', '0%', '10%']
    )

    const opacity = useTransform(scrollY, [0, 3000, 4000], [1, 0.9, 0])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`fixed ${isRTL ? 'left-0' : 'right-0'} pointer-events-none hidden lg:block`}
            style={{
                scale,
                x,
                y,
                opacity,
                zIndex: 0,
                top: '50%',
            }}
        >
            <div
                className="relative"
                style={{
                    width: '1400px',
                    height: '1400px',
                }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-3d"></div>

                {/* Globe Container */}
                <div className="relative w-full h-full">
                    <Web3Globe className="w-full h-full" />
                </div>
            </div>
        </motion.div>
    )
}
