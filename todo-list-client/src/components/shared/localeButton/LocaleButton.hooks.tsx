import { useCallback, useEffect } from "react";
import { LanguagesEnum, DirectionsEnum } from "./LocaleButton.enums";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useLocaleButton = () => {
    const { i18n: { language, changeLanguage } } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const dir = language === LanguagesEnum.AR ? DirectionsEnum.RTL : DirectionsEnum.LTR;
        document.documentElement.setAttribute("dir", dir);
        document.documentElement.setAttribute("lang", language);
    }, [language])

    const toggleLocale = useCallback(() => {
        const newLocale = language === LanguagesEnum.AR ? LanguagesEnum.EN : LanguagesEnum.AR;
        changeLanguage(newLocale);
        navigate(`/${newLocale}/auth`, { replace: true });
    }, [language, changeLanguage, navigate]);

    return { toggleLocale };
};