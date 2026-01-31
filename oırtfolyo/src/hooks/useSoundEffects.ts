import { useRef, useCallback } from 'react';

// Sound URLs (using simple tones generated via Web Audio API)
const useSoundEffects = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const isMutedRef = useRef(false);

    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) => {
        if (isMutedRef.current) return;

        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(volume, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration);
        } catch (e) {
            console.warn('Audio not available');
        }
    }, [getAudioContext]);

    const playHover = useCallback(() => {
        playTone(800, 0.05, 'sine', 0.03);
    }, [playTone]);

    const playClick = useCallback(() => {
        playTone(600, 0.1, 'square', 0.05);
        setTimeout(() => playTone(900, 0.08, 'sine', 0.03), 50);
    }, [playTone]);

    const playSuccess = useCallback(() => {
        playTone(523, 0.1, 'sine', 0.05);
        setTimeout(() => playTone(659, 0.1, 'sine', 0.05), 100);
        setTimeout(() => playTone(784, 0.15, 'sine', 0.05), 200);
    }, [playTone]);

    const toggleMute = useCallback(() => {
        isMutedRef.current = !isMutedRef.current;
        return isMutedRef.current;
    }, []);

    const isMuted = useCallback(() => isMutedRef.current, []);

    return {
        playHover,
        playClick,
        playSuccess,
        toggleMute,
        isMuted
    };
};

export default useSoundEffects;
