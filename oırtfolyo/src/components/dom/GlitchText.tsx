import { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
    children: string;
    className?: string;
    scrambleOnHover?: boolean;
    glitchOnLoad?: boolean;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

const GlitchText = ({
    children,
    className = '',
    scrambleOnHover = true,
    glitchOnLoad = false
}: GlitchTextProps) => {
    const [displayText, setDisplayText] = useState(children);
    const [isGlitching, setIsGlitching] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const originalText = children;

    const scramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        let iteration = 0;
        const totalIterations = originalText.length;

        setIsGlitching(true);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iteration) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            iteration += 1 / 3;

            if (iteration >= totalIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(originalText);
                setIsGlitching(false);
            }
        }, 30);
    };

    useEffect(() => {
        if (glitchOnLoad) {
            const timeout = setTimeout(scramble, 500);
            return () => clearTimeout(timeout);
        }
    }, [glitchOnLoad]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <span
            className={`${className} ${isGlitching ? 'glitch-active' : ''}`}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
            style={{
                display: 'inline-block',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
            }}
        >
            {displayText}
        </span>
    );
};

export default GlitchText;
