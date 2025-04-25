import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemesEnum } from '../enums/theme';

export const useTheme = () => {
    const { t } = useTranslation();
    const savedTheme = useMemo(() => localStorage.getItem('theme') as ThemesEnum | null, []);
    const [theme, setTheme] = useState<ThemesEnum>(savedTheme || ThemesEnum.LIGHT);
    const themeText = useMemo(
        () => (theme === ThemesEnum.DARK ? t('light_mode') : t('dark_mode')),
        [theme, t]
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((previousTheme) => {
            const newTheme = previousTheme === ThemesEnum.DARK ? ThemesEnum.LIGHT : ThemesEnum.DARK;
            return newTheme;
        });
    }, []);

    return { themeText, toggleTheme };
};
