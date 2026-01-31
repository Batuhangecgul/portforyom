import { motion } from 'framer-motion';

const GlowingOrbs = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Primary Orb - Purple */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Secondary Orb - Blue */}
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-blue-600/20 rounded-full blur-[120px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Tertiary Orb - Pink/Accent */}
            <motion.div
                className="absolute top-[20%] right-[20%] w-[25vw] h-[25vw] bg-pink-500/10 rounded-full blur-[100px]"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 100, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

export default GlowingOrbs;
