'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
    id: number
    x: number
    y: number
}

export default function CursorTrail() {
    const [particles, setParticles] = useState<Particle[]>([])
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        let particleId = 0

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })

            // Add new particle
            const newParticle: Particle = {
                id: particleId++,
                x: e.clientX,
                y: e.clientY,
            }

            setParticles((prev) => [...prev, newParticle])

            // Remove particle after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
            }, 1000)
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 0, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        style={{
                            left: particle.x - 4,
                            top: particle.y - 4,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    )
}
