import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';
import { Physics, useSphere, usePlane } from '@react-three/cannon';
import { Text, Environment } from '@react-three/drei';

const skills = [
    { name: 'Angular', color: '#dd0031' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Node.js', color: '#339933' },
    { name: 'PHP', color: '#777bb4' },
    { name: 'Laravel', color: '#ff2d20' },
    { name: 'Three.js', color: '#000000' },
    { name: 'GSAP', color: '#88ce02' },
    { name: 'Tailwind', color: '#38bdf8' },
    { name: 'HTML', color: '#e34f26' },
    { name: 'CSS', color: '#1572b6' },
    { name: 'Git', color: '#f05032' },
];

interface SkillSphereProps {
    position: [number, number, number];
    args: [number, number, number];
    color: string;
    name: string;
}

const SkillSphere = ({ position, args, color, name }: SkillSphereProps) => {
    const [ref] = useSphere(() => ({
        mass: 1,
        position,
        args: [args[0]],
        linearDamping: 0.4,
        angularDamping: 0.4,
    }));

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <sphereGeometry args={args} />
            <meshStandardMaterial
                color={color}
                roughness={0.1}
                metalness={0.1}
                emissive={color}
                emissiveIntensity={0.2}
            />
            <Text
                position={[0, 0, 1.1]}
                fontSize={0.6}
                color="white"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Bold.ttf" // Fallback to default if not found
            >
                {name}
            </Text>
        </mesh>
    );
};

const Mouse = () => {
    const { viewport } = useThree();
    const [ref, api] = useSphere(() => ({ type: 'Kinematic', args: [2], position: [0, 0, 0] }));

    useFrame((state) => {
        // Map mouse position to 3D space
        // x: -1 to 1 -> viewport.width / 2
        const x = (state.mouse.x * viewport.width) / 2;
        const y = (state.mouse.y * viewport.height) / 2;
        api.position.set(x, y, 0);
    });

    return (
        <mesh ref={ref} visible={false}>
            <sphereGeometry args={[2]} />
        </mesh>
    );
};

const Boundaries = () => {
    const { viewport } = useThree();
    // Walls to keep balls inside
    usePlane(() => ({ position: [0, -viewport.height / 2 - 2, 0], rotation: [-Math.PI / 2, 0, 0] })); // Bottom
    usePlane(() => ({ position: [0, viewport.height / 2 + 2, 0], rotation: [Math.PI / 2, 0, 0] })); // Top
    usePlane(() => ({ position: [-viewport.width / 2 - 2, 0, 0], rotation: [0, Math.PI / 2, 0] })); // Left
    usePlane(() => ({ position: [viewport.width / 2 + 2, 0, 0], rotation: [0, -Math.PI / 2, 0] })); // Right
    usePlane(() => ({ position: [0, 0, -5], rotation: [0, 0, 0] })); // Back
    usePlane(() => ({ position: [0, 0, 5], rotation: [0, -Math.PI, 0], isTrigger: true })); // Front (transparent)
    return null;
};

const FloatingSkills = () => {
    const [skillsWithPos] = useState(() => skills.map(skill => ({
        ...skill,
        position: [Math.random() * 10 - 5, Math.random() * 10 - 5, 0] as [number, number, number]
    })));

    return (
        <div className="w-full h-[600px] cursor-none relative z-10">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <Physics gravity={[0, 0, 0]} iterations={10}>
                    <Mouse />
                    <Boundaries />
                    {skillsWithPos.map((skill, i) => (
                        <SkillSphere
                            key={i}
                            name={skill.name}
                            color={skill.color}
                            position={skill.position}
                            args={[1.2, 32, 32]}
                        />
                    ))}
                </Physics>
                <Environment preset="city" />
            </Canvas>

            <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
                <p className="text-sm text-gray-500/50 uppercase tracking-widest font-mono">Drag / Push</p>
            </div>
        </div>
    );
};

export default FloatingSkills;
