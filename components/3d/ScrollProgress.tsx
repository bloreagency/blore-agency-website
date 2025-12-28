'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ScrollIndicator3D() {
    const torusRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (torusRef.current) {
            torusRef.current.rotation.x = state.clock.elapsedTime * 0.5
            torusRef.current.rotation.y = state.clock.elapsedTime * 0.3
            torusRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3
        }
    })

    return (
        <Torus ref={torusRef} args={[1, 0.3, 32, 64]}>
            <MeshDistortMaterial
                color="#8b5cf6"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.1}
                metalness={0.9}
                emissive="#8b5cf6"
                emissiveIntensity={0.5}
            />
        </Torus>
    )
}

export default function ScrollProgress() {
    return (
        <div className="fixed bottom-8 right-8 w-24 h-24 pointer-events-none z-50">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ScrollIndicator3D />
            </Canvas>
        </div>
    )
}
