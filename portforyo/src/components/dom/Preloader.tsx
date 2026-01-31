import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
                >
                    {/* Logo/Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-white mb-8"
                    >
                        <span className="text-primary">B</span>atuhan
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ ease: 'easeOut' }}
                        />
                    </div>

                    {/* Percentage */}
                    <motion.div
                        className="mt-4 text-sm text-gray-500 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {Math.min(Math.round(progress), 100)}%
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
