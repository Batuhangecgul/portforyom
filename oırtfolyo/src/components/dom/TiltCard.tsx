import { useRef, type ReactNode, type MouseEvent } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltStrength?: number;
    glareEnabled?: boolean;
}

const TiltCard = ({
    children,
    className = '',
    tiltStrength = 15,
    glareEnabled = true
}: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -tiltStrength;
        const rotateY = ((x - centerX) / centerX) * tiltStrength;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Glare effect
        if (glareRef.current && glareEnabled) {
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (glareRef.current) {
            glareRef.current.style.background = 'transparent';
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative transition-transform duration-200 ease-out ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl" style={{ transform: 'translateZ(-10px)' }} />

            {children}

            {glareEnabled && (
                <div
                    ref={glareRef}
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-200"
                    style={{ mixBlendMode: 'soft-light' }}
                />
            )}
        </div>
    );
};

export default TiltCard;
