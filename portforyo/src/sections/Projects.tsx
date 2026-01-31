import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import TiltCard from '../components/dom/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Anında Randevu",
        description: "A full-stack appointment booking system built with Angular and Laravel. Real-time availability, user authentication, and seamless scheduling experience.",
        tech: ["Angular", "Laravel", "MySQL"],
        link: "https://aninda-randevu.vercel.app/",
        github: "https://github.com/Batuhangecgul",
        color: "#a855f7"
    },
    {
        title: "Örnek Card 1",
        description: "Example project card demonstrating the portfolio layout and design system.",
        tech: ["React", "TypeScript", "Node.js"],
        link: "#",
        github: "#",
        color: "#8b5cf6"
    },
    {
        title: "Örnek Card 2",
        description: "Example project card showcasing the 3D tilt effect and hover interactions.",
        tech: ["Three.js", "R3F", "GSAP"],
        link: "#",
        github: "#",
        color: "#7c3aed"
    },
    {
        title: "Örnek Card 3",
        description: "Example project card with gradient accents and smooth animations.",
        tech: ["Next.js", "TailwindCSS", "Prisma"],
        link: "#",
        github: "#",
        color: "#6d28d9"
    }
];

const Projects = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(headingRef.current, {
            scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 80%',
            },
            opacity: 0,
            x: -50,
            duration: 1
        });

        // Horizontal scroll animation
        if (scrollContainerRef.current && window.innerWidth > 768) {
            const scrollWidth = scrollContainerRef.current.scrollWidth - window.innerWidth + 200;

            gsap.to(scrollContainerRef.current, {
                x: -scrollWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="projects" className="min-h-screen md:h-screen overflow-hidden pointer-events-none py-20 md:py-0">
            <div className="pointer-events-auto z-10 min-h-screen md:h-screen flex flex-col justify-center px-6 md:px-20 relative">
                <div className="flex items-center gap-4 mb-8">
                    <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold text-white">Selected Works</h2>
                    <ArrowRight size={40} className="text-primary animate-pulse hidden md:block" />
                    <span className="text-gray-500 text-lg hidden md:block">Scroll horizontally</span>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex flex-col md:flex-row gap-8 pl-4 md:pl-4 overflow-x-hidden md:overflow-visible"
                    style={{ width: window.innerWidth > 768 ? 'fit-content' : '100%' }}
                >
                    {projects.map((project, index) => (
                        <TiltCard key={index} className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[500px]">
                            <div
                                className="group relative p-8 rounded-2xl h-[400px] flex flex-col overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                                    boxShadow: `0 0 60px ${project.color}10`
                                }}
                            >
                                {/* Colored top accent */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-1"
                                    style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                                />

                                {/* Hover Gradient BG */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(circle at center, ${project.color}15, transparent 70%)` }}
                                />

                                <div className="relative z-10 flex flex-col h-full transform transition-transform duration-300 group-hover:scale-[1.02]">
                                    <span className="text-xs font-mono text-primary mb-2 opacity-70">0{index + 1}</span>
                                    <h3
                                        className="text-3xl font-bold mb-3 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-white group-hover:to-white"
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 flex-grow leading-relaxed font-light">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map(t => (
                                            <span key={t} className="text-xs font-mono uppercase tracking-wider text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:border-white/20 transition-colors">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-auto">
                                        <a href={project.github} className="flex-1 flex justify-center items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white transition-all backdrop-blur-md border border-white/5 hover:border-white/20">
                                            <Github size={18} /> Code
                                        </a>
                                        <a href={project.link} className="flex-1 flex justify-center items-center gap-2 px-5 py-3 bg-primary/10 hover:bg-primary/20 rounded-xl text-sm font-medium text-white transition-all backdrop-blur-md border border-primary/20 hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                            <ExternalLink size={18} /> Live
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
