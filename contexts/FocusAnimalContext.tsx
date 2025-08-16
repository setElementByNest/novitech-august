import { createContext, ReactNode, useState } from 'react'

type FocusAnimalContextProps = {
    focusAnimals: string;
    setFocusAnimal: (animal: string) => void;
};

type Props = {
    children: ReactNode;
};

export const FocusAnimalContext = createContext<FocusAnimalContextProps>({
    focusAnimals: "",
    setFocusAnimal: () => { }
});

export const FocusAnimalProvider = ({ children }: Props) => {
    const [focusAnimals, setFocusAnimals] = useState<string>("");

    const setFocusAnimal = (animal: string) => {
        setFocusAnimals(animal);
    }
    return (
        <FocusAnimalContext.Provider value={{ focusAnimals, setFocusAnimal }}>
            {children}
        </FocusAnimalContext.Provider>
    );
}