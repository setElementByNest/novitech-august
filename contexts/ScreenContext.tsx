import { createContext, ReactNode, useState } from 'react'

type ScreenContextProps = {
    screen: string;
    selectScreen: (theme: string) => void;
};

type Props = {
    children: ReactNode;
};

export const ScreenContext = createContext<ScreenContextProps>({
    screen: 's',
    selectScreen: () => { }
});

export const ScreenProvider = ({ children }: Props) => {
    const [screen, setScreen] = useState<string>('s');

    const selectScreen = (screen: string) => {
        setScreen(screen)
    }
    return (
        <ScreenContext.Provider value={{ screen, selectScreen }}>
            {children}
        </ScreenContext.Provider>
    );
}