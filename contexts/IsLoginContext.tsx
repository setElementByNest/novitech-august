import { createContext, ReactNode, useState } from 'react';


type IsLoginContextProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
};

type Props = {
    children: ReactNode;
};

export const IsLoginContext = createContext<IsLoginContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => { }
});

export const IsLoginProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <IsLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </IsLoginContext.Provider>
    );
}