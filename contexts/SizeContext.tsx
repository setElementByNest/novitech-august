import { createContext, ReactNode, useState } from 'react'


type SizeContextProps = {
    size: string;
    selectSize: (theme: string) => void;
};

type Props = {
    children: ReactNode;
};

const SizeContext = createContext<SizeContextProps>({
    size: 's',
    selectSize: () => { }
});

export const SizeProvider = ({ children }: Props) => {
    const [size, setSize] = useState<string>('s');

    const selectSize = (size: string) => {
        setSize(size)
    }
    return (
        <SizeContext.Provider value={{ size, selectSize }}>
            {children}
        </SizeContext.Provider>
    );
}