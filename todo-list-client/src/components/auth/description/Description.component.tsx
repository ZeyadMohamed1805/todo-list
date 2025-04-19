import { useTranslation } from "react-i18next";
import styles from "./Description.module.scss";

const Description = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.description}>
            <img className={styles.descriptionLogo} src="/images/nagwa-logo-icon.svg" alt="Nagwa" />
            <h1 className={styles.descriptionTitle}>{t("auth.title")}</h1>
            <p className={styles.descriptionSubtitle}>
                {t("auth.subtitle")}
            </p>
        </div>
    );
};

export default Description;