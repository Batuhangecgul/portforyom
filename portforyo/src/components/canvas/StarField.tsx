import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

// Layer configuration for depth
const layers = [
    { count: 3000, radius: 20, size: 0.03, speed: 0.02, color: '#ffffff' },
    { count: 2000, radius: 12, size: 0.06, speed: 0.03, color: '#e0d4ff' },
    { count: 1000, radius: 6, size: 0.12, speed: 0.05, color: '#c4b5fd' },
];

interface StarLayerProps {
    count: number;
    radius: number;
    size: number;
    speed: number;
    color: string;
    mouseX: React.MutableRefObject<number>;
    mouseY: React.MutableRefObject<number>;
}

const StarLayer = ({ count, radius, size, speed, color, mouseX, mouseY }: StarLayerProps) => {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        return random.inSphere(new Float32Array(count * 3), { radius });
    }, [count, radius]);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta * speed;
            ref.current.rotation.y -= delta * speed * 0.5;

            // Mouse parallax - larger radius = less movement (depth effect)
            const parallaxStrength = 0.3 / (radius / 5);
            ref.current.rotation.x += mouseY.current * parallaxStrength * delta;
            ref.current.rotation.y += mouseX.current * parallaxStrength * delta;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

// Nebula cloud effect
const Nebula = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -10]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial
                transparent
                opacity={0.15}
                color="#6b21a8"
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

const StarField = () => {
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const { viewport } = useThree();

    useFrame(({ pointer }) => {
        // Smooth mouse tracking
        mouseX.current = THREE.MathUtils.lerp(mouseX.current, pointer.x * viewport.width, 0.05);
        mouseY.current = THREE.MathUtils.lerp(mouseY.current, pointer.y * viewport.height, 0.05);
    });

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <Nebula />

            {layers.map((layer, i) => (
                <StarLayer key={i} {...layer} mouseX={mouseX} mouseY={mouseY} />
            ))}

            {/* Central glow */}
            <mesh position={[2, -1, -5]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.08}
                    color="#a855f7"
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

export default StarField;
