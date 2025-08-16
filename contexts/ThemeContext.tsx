import { createContext, ReactNode, useState } from 'react'

type ThemeProps = 'light' | 'dark';

type ThemeContextProps = {
    theme: ThemeProps;
    selectTheme: (theme: ThemeProps) => void;
};

type Props = {
    children: ReactNode;
};

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    selectTheme: () => { }
});

export const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<ThemeProps>('light');

    const selectTheme = (theme: ThemeProps) => {
        setTheme(theme)
    }
    return (
        <ThemeContext.Provider value={{ theme, selectTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}