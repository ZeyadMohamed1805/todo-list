import styles from "./LocaleButton.module.scss";
import { useLocaleButton } from "./LocaleButton.hooks";

const LocaleButton = () => {
    const localeButtonData = useLocaleButton();

    return (
        <button type="button" onClick={localeButtonData.toggleLocale} className={styles.localeButton}>
            {localeButtonData.localeText}
        </button>
    );
};

export default LocaleButton;
