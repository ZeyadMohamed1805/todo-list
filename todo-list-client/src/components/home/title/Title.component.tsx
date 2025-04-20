import { useTranslation } from "react-i18next";
import styles from "./Title.module.scss";

const Title = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{t("home.title")}</h1>
            <button type="button" className={styles.button}>
                {t("home.add_list")}
            </button>
        </div>
    );
};

export default Title;
