import React, { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { SizeProvider } from './SizeContext';
import { LangProvider } from './LangContext'
import { ScreenProvider } from './ScreenContext';
import { AnimalProvider } from './ListAnimalContext';
import { FocusAnimalProvider } from './FocusAnimalContext';

const providers = [
    ThemeProvider,
    SizeProvider,
    LangProvider,
    ScreenProvider,
    AnimalProvider,
    FocusAnimalProvider,
];

type Props = {
    children: ReactNode;
};

export const AppProviders = ({ children }: Props) =>
    providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
    }, children);
