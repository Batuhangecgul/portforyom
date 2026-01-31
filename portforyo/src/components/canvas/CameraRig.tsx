import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const CameraRig = () => {
    useFrame((state, delta) => {
        // Basic scroll interaction example
        // Real implementation would bind to scroll position
        // For now, let's just add some subtle mouse interaction or noise

        // Read scroll from body or lenis via global state if available, 
        // but simple mouse parallax is good for now:
        const pointer = state.pointer;
        easing.damp3(state.camera.position, [
            pointer.x * 0.2,
            pointer.y * 0.2,
            5
        ], 0.25, delta);

        easing.dampE(state.camera.rotation, [
            pointer.y * 0.1,
            -pointer.x * 0.1,
            0
        ], 0.25, delta);
    });

    return null;
}

export default CameraRig;
