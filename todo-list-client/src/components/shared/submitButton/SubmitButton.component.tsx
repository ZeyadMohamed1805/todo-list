import { useTranslation } from "react-i18next";
import styles from "./SubmitButton.module.scss";

const SubmitButton = () => {
    const { t } = useTranslation();

    return (
        <button type="submit" className={styles.submitButton}>
            {t('submit')}
        </button>
    );
};

export default SubmitButton;