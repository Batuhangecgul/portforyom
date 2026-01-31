import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

import Spotlight from './Spotlight';
import GlowingOrbs from './GlowingOrbs';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main className="content-container select-none">
            {/* Visual Effects Layer */}
            <Spotlight />
            <GlowingOrbs />

            {/* This container will scroll */}
            <div className="relative w-full z-10">
                {children}
            </div>
        </main>
    );
};

export default Layout;
