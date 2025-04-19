import { useCallback, useEffect, useMemo, useState } from "react";
import { LocalesEnum } from "./LocaleButton.enums";

export const useLocaleButton = () => {
    const savedLocale = useMemo(() => localStorage.getItem("locale") as LocalesEnum | null, []);
    const [locale, setLocale] = useState<LocalesEnum>(savedLocale || LocalesEnum.EN);
    const localeText = useMemo(() => (locale === LocalesEnum.EN ? "🌐 العربية" : "🌐 English"), [locale]);

    useEffect(() => {
        document.documentElement.setAttribute("lang", locale);
        localStorage.setItem("locale", locale);
    }, [locale]);

    const toggleLocale = useCallback(() => {
        setLocale(previousLocale => {
            const newLocale = previousLocale === LocalesEnum.EN ? LocalesEnum.AR : LocalesEnum.EN;
            return newLocale;
        });
    }, []);

    return { localeText, toggleLocale };
};