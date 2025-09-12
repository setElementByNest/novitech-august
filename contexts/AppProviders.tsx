import React, { ReactNode } from 'react';
import { IsLoginProvider } from './IsLoginContext';

const providers = [
    IsLoginProvider
];

type Props = {
    children: ReactNode;
};

export const AppProviders = ({ children }: Props) =>
    providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
    }, children);
