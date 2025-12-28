'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface HolographicButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    variant?: 'primary' | 'secondary'
}

function Button3D({ isHovered }: { isHovered: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = isHovered ? Math.sin(state.clock.elapsedTime * 2) * 0.1 : 0
            meshRef.current.scale.setScalar(isHovered ? 1.1 : 1)
        }
    })

    return (
        <RoundedBox ref={meshRef} args={[3, 1, 0.3]} radius={0.2} smoothness={4}>
            <meshStandardMaterial
                color="#8b5cf6"
                metalness={0.9}
                roughness={0.1}
                emissive="#8b5cf6"
                emissiveIntensity={isHovered ? 0.5 : 0.2}
            />
        </RoundedBox>
    )
}

export default function HolographicButton({ children, onClick, className = '', variant = 'primary' }: HolographicButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    const baseClasses = variant === 'primary'
        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
        : 'bg-white/10 border-2 border-purple-500 text-purple-300'

    return (
        <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* 3D Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Button3D isHovered={isHovered} />
                </Canvas>
            </div>

            {/* Button Content */}
            <button
                onClick={onClick}
                className={`relative px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 ${baseClasses} ${className}`}
            >
                {children}

                {/* Holographic Shine Effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'
                            }`}
                    />
                </div>
            </button>
        </motion.div>
    )
}
