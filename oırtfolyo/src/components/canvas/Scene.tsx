import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
    children?: React.ReactNode;
}

const Scene = ({ children }: SceneProps) => {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#000000']} />
                    {/* Ambient glow light */}
                    <ambientLight intensity={0.1} color="#a855f7" />
                    <pointLight position={[10, 10, 10]} intensity={0.3} color="#a855f7" />
                    {children}
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
