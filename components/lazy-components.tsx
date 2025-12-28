import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Lazy load heavy 3D components
export const ParticleBackground = dynamic(
    () => import('@/components/3d/ParticleBackground'),
    {
        loading: () => <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20" />,
        ssr: false
    }
)

export const FloatingElements = dynamic(
    () => import('@/components/3d/FloatingElements'),
    {
        loading: () => <div className="absolute inset-0" />,
        ssr: false
    }
)

export const Web3Globe = dynamic(
    () => import('@/components/Web3Globe'),
    {
        loading: () => <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full animate-pulse" />,
        ssr: false
    }
)

// Lazy load animation components
export const ScrollReveal = dynamic(
    () => import('@/components/animations/ScrollReveal'),
    {
        loading: () => <div className="opacity-0" />,
        ssr: true
    }
)

export const AnimatedCounter = dynamic(
    () => import('@/components/animations/AnimatedCounter'),
    {
        loading: () => <span>0</span>,
        ssr: false
    }
)

// Lazy load mobile components
export const BottomNav = dynamic(
    () => import('@/components/mobile/BottomNav'),
    {
        loading: () => null,
        ssr: false
    }
)
