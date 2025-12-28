'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number; duration: number }>>([])

    useEffect(() => {
        // Generate particle positions only on client-side to avoid hydration mismatch
        setParticles(
            [...Array(20)].map(() => ({
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                delay: Math.random() * 2,
                duration: Math.random() * 3 + 2,
            }))
        )

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setIsLoading(false), 500)
                    return 100
                }
                return prev + 10
            })
        }, 100)

        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950"
                >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 mb-8"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center"
                        >
                            <span className="text-4xl font-black text-white">B</span>
                        </motion.div>
                    </motion.div>

                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10 text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">BLORE Agency</h2>
                        <p className="text-gray-400 text-sm">Loading Experience...</p>
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-10 w-64 mt-8"
                    >
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-600 to-cyan-500"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <p className="text-center text-gray-500 text-xs mt-2">{progress}%</p>
                    </motion.div>

                    {/* Floating Particles - Only render after client-side hydration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((particle, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
                                initial={{
                                    x: particle.x,
                                    y: particle.y,
                                }}
                                animate={{
                                    y: [null, -100],
                                    opacity: [0.3, 0],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    delay: particle.delay,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
