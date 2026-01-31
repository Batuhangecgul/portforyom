import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import useSoundEffects from '../../hooks/useSoundEffects';

const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isMuted, setIsMuted] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const { playClick, playHover, toggleMute } = useSoundEffects();

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 100);

            const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (href: string) => {
        playClick();
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleToggleMute = () => {
        const newMuted = toggleMute();
        setIsMuted(newMuted);
    };

    return (
        <>
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary z-[1000] origin-left"
                style={{ scaleX }}
            />

            {/* Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] max-w-[95vw] overflow-x-auto no-scrollbar rounded-full backdrop-blur-xl border bg-black/40 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
                <ul className="flex items-center gap-1 p-2 min-w-max">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.replace('#', '');
                        return (
                            <li key={item.href}>
                                <button
                                    onClick={() => scrollTo(item.href)}
                                    onMouseEnter={playHover}
                                    className={`relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${isActive
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 rounded-full border bg-primary/20 border-primary/30"
                                            transition={{ type: 'spring', duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}

                    {/* Divider */}
                    <li className="w-px h-4 md:h-6 mx-1 bg-white/20" />

                    {/* Sound Toggle */}
                    <li>
                        <button
                            onClick={handleToggleMute}
                            onMouseEnter={playHover}
                            className="p-1.5 md:p-2 rounded-full transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/10"
                            title={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? <VolumeX size={16} className="md:w-[18px] md:h-[18px]" /> : <Volume2 size={16} className="md:w-[18px] md:h-[18px]" />}
                        </button>
                    </li>
                </ul>
            </motion.nav>
        </>
    );
};

export default Navbar;
