import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 8);
            cursorY.set(e.clientY - 8);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    scale: isHovering ? 2.5 : 1,
                }}
                transition={{ type: 'spring', damping: 20 }}
            />

            {/* Trailing ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-primary/50 pointer-events-none z-[9998]"
                style={{
                    x: useSpring(cursorX, { damping: 35, stiffness: 200 }),
                    y: useSpring(cursorY, { damping: 35, stiffness: 200 }),
                    translateX: '-12px',
                    translateY: '-12px',
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.8 : 0.4,
                }}
            />
        </>
    );
};

export default CustomCursor;
