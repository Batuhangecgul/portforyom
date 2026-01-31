import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { category: "Frontend", items: ["Angular", "React", "TypeScript", "JavaScript", "HTML", "CSS"] },
    { category: "Backend", items: ["PHP", "Node.js", "Laravel", "MySQL", "REST APIs"] },
    { category: "Languages", items: ["TypeScript", "JavaScript", "PHP"] },
    { category: "Tools", items: ["Git", "Vite", "VS Code"] }
];

const Skills = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(headingRef.current, {
            scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 80%',
            },
            opacity: 0,
            y: 30,
            duration: 1
        });

        const items = gridRef.current?.children;
        if (items) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 75%',
                },
                opacity: 0,
                scale: 0.9,
                stagger: 0.1,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="skills" className="min-h-[50vh] flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto py-20 pointer-events-none">
            <div className="pointer-events-auto z-10 w-full">
                <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-16 text-white text-right">Technical Arsenal</h2>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((group, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-xl font-medium text-primary border-b border-primary/20 pb-2">{group.category}</h3>
                            <ul className="space-y-2">
                                {group.items.map((skill) => (
                                    <li key={skill} className="text-gray-300 hover:text-white transition-colors cursor-default">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
