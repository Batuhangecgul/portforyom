import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(textRef.current, {
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="min-h-[50vh] flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto py-20 pointer-events-none">
            <div ref={textRef} className="pointer-events-auto z-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6 md:mb-8">About Me</h2>
                <div className="text-lg md:text-xl lg:text-3xl leading-relaxed text-gray-300 font-light max-w-4xl space-y-6">
                    <p>
                        I'm <span className="text-white font-normal">Batuhan Geçgül</span>, a 20-year-old <span className="text-white font-normal">Full-Stack Developer</span> passionate about building modern, efficient, and scalable web applications.
                    </p>
                    <p>
                        I love working on both the frontend and backend, bringing ideas to life through clean design, solid architecture, and powerful functionality.
                    </p>
                    <p>
                        My main stack includes <span className="text-secondary">Angular</span>, <span className="text-secondary">TypeScript</span>, <span className="text-secondary">PHP</span>, and <span className="text-secondary">Node.js</span>. I focus on creating user-friendly interfaces, optimized APIs, and seamless communication between client and server.
                    </p>
                    <p>
                        I've worked on various projects involving real-world problems — from improving existing systems to developing new features from scratch. My goal is to build applications that not only work great but also make a difference.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
