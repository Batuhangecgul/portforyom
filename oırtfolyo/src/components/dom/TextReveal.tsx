import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
}

const TextReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 1.2
}: TextRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        gsap.fromTo(textRef.current,
            {
                yPercent: 100,
                opacity: 0,
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: 'power4.out',
            }
        );
    }, [delay, duration]);

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden ${className}`}
        >
            <span
                ref={textRef}
                className="inline-block"
                style={{ willChange: 'transform' }}
            >
                {children}
            </span>
        </div>
    );
};

export default TextReveal;
