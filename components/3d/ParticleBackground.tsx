'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2000 }: { count?: number }) {
    const meshRef = useRef<THREE.Points>(null)

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            // Random positions in a larger space
            positions[i * 3] = (Math.random() - 0.5) * 30
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15

            // Vibrant gradient colors (purple to cyan to pink)
            const t = Math.random()
            if (t < 0.33) {
                // Purple
                colors[i * 3] = 0.5 + Math.random() * 0.3
                colors[i * 3 + 1] = 0.2 + Math.random() * 0.3
                colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
            } else if (t < 0.66) {
                // Cyan
                colors[i * 3] = 0.0 + Math.random() * 0.3
                colors[i * 3 + 1] = 0.6 + Math.random() * 0.3
                colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
            } else {
                // Pink
                colors[i * 3] = 0.9 + Math.random() * 0.1
                colors[i * 3 + 1] = 0.2 + Math.random() * 0.3
                colors[i * 3 + 2] = 0.6 + Math.random() * 0.3
            }
        }

        return { positions, colors }
    }, [count])

    useFrame((state) => {
        if (meshRef.current) {
            // Slow rotation
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.03
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
        }
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

export default function ParticleBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 75 }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
            >
                <Particles count={2500} />
            </Canvas>
        </div>
    )
}
