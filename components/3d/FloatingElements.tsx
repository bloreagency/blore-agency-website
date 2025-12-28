'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
        }
    })

    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    )
}

export default function FloatingElements() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
                    <pointLight position={[10, 10, 5]} intensity={0.5} color="#06b6d4" />

                    <FloatingSphere position={[-3, 2, 0]} color="#8b5cf6" speed={0.5} />
                    <FloatingSphere position={[3, -2, -2]} color="#06b6d4" speed={0.7} />
                    <FloatingSphere position={[0, 0, -3]} color="#ec4899" speed={0.6} />
                </Suspense>
            </Canvas>
        </div>
    )
}
