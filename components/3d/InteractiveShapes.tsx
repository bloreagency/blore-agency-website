'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Box, Torus, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingShapeProps {
    position: [number, number, number]
    color: string
    speed: number
    type: 'sphere' | 'box' | 'torus'
}

function FloatingShape({ position, color, speed, type }: FloatingShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed) * 0.1
        }
    })

    const renderShape = () => {
        switch (type) {
            case 'sphere':
                return (
                    <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
                        <MeshDistortMaterial
                            color={color}
                            attach="material"
                            distort={0.5}
                            speed={2}
                            roughness={0.1}
                            metalness={0.9}
                            emissive={color}
                            emissiveIntensity={0.3}
                        />
                    </Sphere>
                )
            case 'box':
                return (
                    <Box ref={meshRef} args={[1.5, 1.5, 1.5]} position={position}>
                        <MeshWobbleMaterial
                            color={color}
                            attach="material"
                            factor={0.3}
                            speed={1.5}
                            roughness={0.1}
                            metalness={0.8}
                            emissive={color}
                            emissiveIntensity={0.2}
                        />
                    </Box>
                )
            case 'torus':
                return (
                    <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position}>
                        <MeshDistortMaterial
                            color={color}
                            attach="material"
                            distort={0.3}
                            speed={1.8}
                            roughness={0.2}
                            metalness={0.85}
                            emissive={color}
                            emissiveIntensity={0.25}
                        />
                    </Torus>
                )
        }
    }

    return (
        <Float speed={speed} rotationIntensity={1.5} floatIntensity={2.5}>
            {renderShape()}
        </Float>
    )
}

export default function InteractiveShapes() {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-60">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
            >
                <Suspense fallback={null}>
                    {/* Enhanced Lighting */}
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[10, 10, 5]} intensity={1.2} />
                    <pointLight position={[-10, -10, -5]} intensity={0.8} color="#8b5cf6" />
                    <pointLight position={[10, 10, 5]} intensity={0.8} color="#06b6d4" />
                    <pointLight position={[0, -10, 0]} intensity={0.6} color="#ec4899" />
                    <spotLight
                        position={[0, 10, 0]}
                        angle={0.3}
                        penumbra={1}
                        intensity={0.5}
                        color="#ffffff"
                    />

                    {/* Floating Shapes */}
                    <FloatingShape position={[-4, 3, -2]} color="#8b5cf6" speed={0.5} type="sphere" />
                    <FloatingShape position={[4, -2, -3]} color="#06b6d4" speed={0.6} type="torus" />
                    <FloatingShape position={[0, 0, -4]} color="#ec4899" speed={0.7} type="box" />
                    <FloatingShape position={[-2, -3, -1]} color="#f59e0b" speed={0.55} type="sphere" />
                    <FloatingShape position={[3, 2, -2.5]} color="#10b981" speed={0.65} type="torus" />
                </Suspense>
            </Canvas>
        </div>
    )
}
