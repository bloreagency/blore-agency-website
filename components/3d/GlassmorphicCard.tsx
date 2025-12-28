'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({ color, position }: { color: string; position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2
        }
    })

    return (
        <Sphere ref={meshRef} args={[0.5, 64, 64]} position={position}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.6}
                speed={2}
                roughness={0.1}
                metalness={0.9}
                emissive={color}
                emissiveIntensity={0.4}
            />
        </Sphere>
    )
}

export default function GlassmorphicCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative overflow-hidden rounded-3xl ${className}`}>
            {/* 3D Background */}
            <div className="absolute inset-0 -z-10 opacity-30">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <AnimatedSphere color="#8b5cf6" position={[-1, 0, 0]} />
                    <AnimatedSphere color="#06b6d4" position={[1, 0, 0]} />
                </Canvas>
            </div>

            {/* Glassmorphic Layer */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                {children}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        </div>
    )
}
