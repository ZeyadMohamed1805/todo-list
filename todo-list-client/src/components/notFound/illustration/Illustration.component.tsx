import { useTranslation } from "react-i18next";
import styles from "./Illustration.module.scss";

const Illustration = () => {
    const { t } = useTranslation();
    
    return (
        <div className={styles.illustration}>
            <img src="/images/not-found.png" alt={t("404_not_found")} />
        </div>
    );
};

export default Illustration;
