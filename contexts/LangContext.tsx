import { createContext, ReactNode } from 'react'
import { useTranslation } from 'react-i18next';
import '../lang';

export type LangProps = 'THA' | 'ENG' | 'MYA';

type LangContextProps = {
    lang: LangProps;
    selectLang: (lang: LangProps) => void;
};

type Props = {
    children: ReactNode;
};

export const LangContext = createContext<LangContextProps>({
    lang: 'THA',
    selectLang: () => { }
});

export const LangProvider = ({ children }: Props) => {
    const { t, i18n } = useTranslation();

    const selectLang = (lang: LangProps) => {
        i18n.changeLanguage(lang);
    }
    return (
        <LangContext.Provider value={{ lang: i18n.language as LangProps, selectLang }}>
            {children}
        </LangContext.Provider>
    );
}