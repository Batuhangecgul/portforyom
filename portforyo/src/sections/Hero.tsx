import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import MagneticButton from '../components/dom/MagneticButton';
import GlitchText from '../components/dom/GlitchText';

const AnimatedGradientText = ({ children, className = '' }: { children: string; className?: string }) => {
    return (
        <span
            className={`text-transparent bg-clip-text bg-[length:200%_auto] ${className}`}
            style={{
                backgroundImage: 'linear-gradient(90deg, #a855f7, #ec4899, #8b5cf6, #a855f7)',
                animation: 'gradient 3s linear infinite',
            }}
        >
            {children}
        </span>
    );
};

const SplitText = ({ children, delay = 0 }: { children: string; delay?: number }) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const chars = containerRef.current.querySelectorAll('.char');

        gsap.fromTo(chars,
            { opacity: 0, y: 80, rotateX: -90 },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.6,
                stagger: 0.02,
                delay: delay,
                ease: 'back.out(1.7)',
            }
        );
    }, [delay]);

    return (
        <span ref={containerRef} style={{ perspective: '1000px', display: 'inline-block' }}>
            {children.split('').map((char, i) => (
                <span
                    key={i}
                    className="char inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const subtextRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const glitchRef = useRef<HTMLDivElement>(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 1800);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (!showContent) return;

        gsap.fromTo(subtextRef.current,
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 2.5 }
        );
        gsap.fromTo(ctaRef.current,
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 2.8 }
        );
        gsap.fromTo(glitchRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: 3.2 }
        );
    }, { scope: containerRef, dependencies: [showContent] });

    const scrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!showContent) return <section id="hero" className="min-h-[100dvh]" />;

    return (
        <section id="hero" ref={containerRef} className="min-h-[100dvh] flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto relative pointer-events-none py-20 md:py-0">
            <div className="pointer-events-auto z-10 w-full">
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold leading-tight mb-6 md:mb-8 text-white">
                    <SplitText delay={1.5}>Hi, I'm Batuhan</SplitText>
                    <br />
                    <span className="block mt-2">
                        <AnimatedGradientText className="text-4xl sm:text-5xl md:text-7xl">
                            Full-Stack Developer
                        </AnimatedGradientText>
                    </span>
                    <br />
                    <SplitText delay={2.0}>crafting modern & immersive experiences</SplitText>
                </h1>

                <p ref={subtextRef} className="opacity-0 text-lg md:text-2xl text-gray-400 mb-8 font-light max-w-2xl backdrop-blur-md bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
                    Angular • TypeScript • PHP • Node.js • Laravel
                </p>

                {/* Glitch text accent */}
                <div ref={glitchRef} className="opacity-0 mb-8">
                    <span className="text-xs md:text-sm text-gray-500 mr-2">Currently:</span>
                    <GlitchText className="text-primary text-xs md:text-sm font-bold" scrambleOnHover glitchOnLoad>
                        OPEN TO OPPORTUNITIES
                    </GlitchText>
                </div>

                <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <MagneticButton
                        onClick={scrollToProjects}
                        className="group px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] transition-all duration-300 w-full sm:w-auto"
                    >
                        <span className="relative flex items-center justify-center gap-3 font-semibold text-base md:text-lg z-10">
                            View Projects
                            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
                        </span>
                    </MagneticButton>

                    <MagneticButton
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group px-8 py-4 md:px-10 md:py-5 bg-white/5 border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-primary/50 transition-all duration-300 w-full sm:w-auto"
                    >
                        <span className="relative flex items-center justify-center gap-3 font-semibold text-base md:text-lg z-10">
                            Get in Touch
                        </span>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
};

export default Hero;
