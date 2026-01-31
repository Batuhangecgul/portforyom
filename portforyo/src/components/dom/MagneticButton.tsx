import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const MagneticButton = ({
    children,
    className = '',
    onClick,
    strength = 0.3,
    type = "button",
    disabled = false
}: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button || disabled) return;

        const handleMouseMove = (e: globalThis.MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
            });
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength, disabled]);

    return (
        <button
            ref={buttonRef}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`relative overflow-hidden transition-shadow ${className}`}
        >
            {children}
        </button>
    );
};

export default MagneticButton;
