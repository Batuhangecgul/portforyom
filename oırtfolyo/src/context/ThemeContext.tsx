import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        localStorage.setItem('theme', theme);

        if (theme === 'light') {
            root.classList.add('light-mode');
            root.classList.remove('dark-mode');
            root.style.setProperty('--bg-primary', '#f8fafc');
            root.style.setProperty('--bg-secondary', '#e2e8f0');
            root.style.setProperty('--text-primary', '#0f172a');
            root.style.setProperty('--text-secondary', '#475569');
            root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.8)');
            root.style.setProperty('--card-border', 'rgba(0, 0, 0, 0.1)');
        } else {
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
            root.style.setProperty('--bg-primary', '#000000');
            root.style.setProperty('--bg-secondary', '#0a0a0a');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#9ca3af');
            root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.05)');
            root.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.1)');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
};
