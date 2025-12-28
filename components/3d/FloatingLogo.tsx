'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Logo3D() {
    const textRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (textRef.current) {
            // Gentle rotation
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
            textRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1

            // Floating effect
            textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Center>
                <Text3D
                    ref={textRef}
                    font="/fonts/inter-bold.json"
                    size={1.5}
                    height={0.3}
                    curveSegments={32}
                    bevelEnabled
                    bevelThickness={0.05}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={10}
                >
                    BLORE
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        resolution={512}
                        transmission={0.95}
                        roughness={0.1}
                        thickness={0.5}
                        ior={1.5}
                        chromaticAberration={0.5}
                        anisotropy={1}
                        distortion={0.3}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        color="#8b5cf6"
                    />
                </Text3D>
            </Center>
        </Float>
    )
}

function SimpleLogo3D() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
        }
    })

    return (
        <mesh ref={meshRef}>
            <torusGeometry args={[2, 0.6, 32, 100]} />
            <meshStandardMaterial
                color="#8b5cf6"
                emissive="#8b5cf6"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    )
}

export default function FloatingLogo({ simple = false }: { simple?: boolean }) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
                <pointLight position={[10, 10, 5]} intensity={0.5} color="#ec4899" />

                {simple ? <SimpleLogo3D /> : <Logo3D />}
            </Canvas>
        </div>
    )
}
