import { useTranslation } from "react-i18next";
import styles from "./SubmitButton.module.scss";
import { TSubmitButtonProps } from "./SubmitButton.types";

const SubmitButton = ({ props }: TSubmitButtonProps) => {
    const { t } = useTranslation();

    return (
        <button type="submit" data-variant={props?.variant} className={styles.submitButton}>
            {t('submit')}
        </button>
    );
};

export default SubmitButton;