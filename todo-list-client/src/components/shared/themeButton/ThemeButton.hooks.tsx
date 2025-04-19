import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemesEnum } from "./ThemeButton.enums";

export const useThemeButton = () => {
    const savedTheme = useMemo(() => localStorage.getItem("theme") as ThemesEnum | null, []);
    const [theme, setTheme] = useState<ThemesEnum>(savedTheme || ThemesEnum.LIGHT);
    const themeText = useMemo(() => (theme === ThemesEnum.DARK ? "☀️ Light Mode" : "🌙 Dark Mode"), [theme]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(previousTheme => {
            const newTheme = previousTheme === ThemesEnum.DARK ? ThemesEnum.LIGHT : ThemesEnum.DARK;
            return newTheme;
        });
    }, []);

    return { themeText, toggleTheme };
};
