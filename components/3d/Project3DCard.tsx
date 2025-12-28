'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, MeshReflectorMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import * as THREE from 'three'

interface Project3DCardProps {
    project: {
        slug: string
        title: string
        category: string
        shortDescription: string
        image: string
        tags: string[]
    }
    index: number
    onClick?: () => void
}

function Card3D({ rotation }: { rotation: { x: number; y: number } }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                rotation.x * 0.3,
                0.1
            )
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                rotation.y * 0.3,
                0.1
            )
        }
    })

    return (
        <RoundedBox ref={meshRef} args={[4, 5, 0.2]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
                color="#1f2937"
                metalness={0.8}
                roughness={0.2}
                emissive="#8b5cf6"
                emissiveIntensity={0.1}
            />
        </RoundedBox>
    )
}

export default function Project3DCard({ project, index, onClick }: Project3DCardProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
        const y = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        setRotation({ x, y })
    }

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 })
        setIsHovered(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
        >
            <div
                className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                style={{
                    transform: isHovered
                        ? `perspective(1000px) rotateX(${rotation.x * 5}deg) rotateY(${rotation.y * 5}deg) scale(1.05)`
                        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                    transition: 'transform 0.3s ease-out',
                }}
            >
                {/* 3D Canvas Background */}
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                        <Card3D rotation={rotation} />
                    </Canvas>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/95 p-8">
                    {/* Project Image */}
                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm rounded-full backdrop-blur-sm">
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                        {project.shortDescription}
                    </p>

                    {/* Tags */}
                    <div className="mt-auto flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-purple-300 text-xs rounded-full border border-purple-700/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Hover Glow Effect */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${(rotation.y + 1) * 50}% ${(rotation.x + 1) * 50}%, rgba(139, 92, 246, 0.3), transparent 50%)`,
                        }}
                    />
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-purple-500/0 group-hover:border-purple-500/50 transition-all duration-500" />
            </div>
        </motion.div>
    )
}
