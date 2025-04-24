import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks";

const Loading = () => {
    const { t } = useTranslation();
    useTheme();

    return (
        <main>
            <img src="/gifs/nagwa-loader-logo-unscreen.gif" alt={t("loading")} />
        </main>
    );
};

export default Loading;
