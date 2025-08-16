import { createContext, ReactNode, useState } from 'react'
import { demo_animal } from '../data/FetchData';

export type AnimalProps = {
    id: string;
    name: string;
    code: string;
    gender: 'ผู้' | 'เมีย';
    age: number;
    weight: number;
    status: AnimalStatus;
};

export type AnimalStatus = 'ปกติ' | 'ติดสัด' | 'ผิดปกติ' | 'ส่งออก' | 'ตาย';

type AnimalContextProps = {
    animals: AnimalProps[];
    setAnimal: (animal: AnimalProps) => void;
    setAnimalAll: (animal: AnimalProps[]) => void;
};

type Props = {
    children: ReactNode;
};

export const AnimalContext = createContext<AnimalContextProps>({
    animals: [],
    setAnimal: () => { },
    setAnimalAll: () => []
});

export const AnimalProvider = ({ children }: Props) => {
    const [animals, setAnimals] = useState<AnimalProps[]>(demo_animal);

    const setAnimal = (animal: AnimalProps) => {
        setAnimals(prev => [...prev, animal]);
    }
    
    const setAnimalAll = (animal: AnimalProps[]) => {
        setAnimals(animal);
    }
    return (
        <AnimalContext.Provider value={{ animals, setAnimal, setAnimalAll }}>
            {children}
        </AnimalContext.Provider>
    );
}