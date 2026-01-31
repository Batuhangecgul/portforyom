import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface SplitTextAnimationProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
    type?: 'chars' | 'words' | 'lines';
}

const SplitTextAnimation = ({
    children,
    className = '',
    delay = 0,
    stagger = 0.03,
    type = 'chars'
}: SplitTextAnimationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll('.char');

        gsap.fromTo(chars,
            {
                opacity: 0,
                y: 50,
                rotateX: -90,
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: stagger,
                delay: delay,
                ease: 'back.out(1.7)',
            }
        );
    }, [delay, stagger]);

    // Split text into individual characters
    const splitContent = () => {
        if (type === 'chars') {
            return children.split('').map((char, i) => (
                <span
                    key={i}
                    className="char inline-block"
                    style={{
                        display: char === ' ' ? 'inline' : 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ));
        } else if (type === 'words') {
            return children.split(' ').map((word, i) => (
                <span key={i} className="char inline-block mr-2">
                    {word}
                </span>
            ));
        }
        return children;
    };

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ perspective: '1000px' }}
        >
            {splitContent()}
        </div>
    );
};

export default SplitTextAnimation;
