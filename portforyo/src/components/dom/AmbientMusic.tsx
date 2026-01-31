import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// Local ambient audio file
const AMBIENT_AUDIO_URL = '/ambient.mp3';

const AmbientMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [volume, setVolume] = useState(0.2);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element
        const audio = new Audio(AMBIENT_AUDIO_URL);
        audio.loop = true;
        audio.volume = volume;
        audio.preload = 'auto';
        audioRef.current = audio;

        const tryAutoplay = () => {
            if (!audioRef.current) return;

            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                })
                .catch(() => {
                    // Autoplay blocked by browser - will play on user interaction
                });
        };

        // Try to autoplay after preloader delay
        const autoplayTimeout = setTimeout(() => {
            tryAutoplay();
        }, 3500);

        // Play on first user interaction
        const handleFirstInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasInteracted(true);
                    })
                    .catch(() => { });
            }
        };

        // Listen to multiple events for user interaction
        const events = ['click', 'keydown', 'scroll', 'mousemove', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { once: true });
        });

        return () => {
            clearTimeout(autoplayTimeout);
            events.forEach(event => {
                document.removeEventListener(event, handleFirstInteraction);
            });
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(console.error);
        }
        setHasInteracted(true);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.5 }}
            className="fixed top-24 right-4 md:top-auto md:right-auto md:bottom-6 md:left-6 z-[1000] flex items-center gap-3 px-4 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full"
        >
            <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? (
                    <Volume2 size={18} className="text-primary animate-pulse" />
                ) : (
                    <VolumeX size={18} className="text-gray-400" />
                )}
            </button>

            {/* Volume slider */}
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
            />

            <span className="text-xs text-gray-500 font-mono min-w-[60px]">
                {isPlaying ? '♫ playing' : '♫ paused'}
            </span>
        </motion.div>
    );
};

export default AmbientMusic;
