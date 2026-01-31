import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCrystal = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useFrame(({ clock, pointer }) => {
        if (meshRef.current) {
            // Mouse follow rotation
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                pointer.y * 0.3,
                0.05
            );
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                pointer.x * 0.3 + clock.elapsedTime * 0.2,
                0.05
            );
        }

        if (materialRef.current) {
            // Animate distortion
            materialRef.current.distort = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]}
        >
            <mesh ref={meshRef} position={[3, 0.5, 0]} scale={1.2}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#a855f7"
                    emissive="#7c3aed"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.8}
                    distort={0.3}
                    speed={2}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Inner glow sphere */}
            <mesh position={[3, 0.5, 0]} scale={0.8}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#c084fc"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Outer glow */}
            <mesh position={[3, 0.5, 0]} scale={1.8}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </mesh>
        </Float>
    );
};

export default FloatingCrystal;
