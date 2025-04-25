import { useTranslation } from "react-i18next";
import { useLoading } from "./Loading.hooks";
import styles from "./Loading.module.scss";

const Loading = () => {
    const { t } = useTranslation();
    const { isVisible } = useLoading();

    if (!isVisible) return null;

    return (
        <div className={styles.loadingOverlay}>
            <img src="/gifs/nagwa-loader-logo.gif" alt={t("loading")} />
        </div>
    );
};

export default Loading;
