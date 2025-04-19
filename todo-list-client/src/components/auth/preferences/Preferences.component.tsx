
import styles from "./Preferences.module.scss";
import ThemeButton from "../../shared/themeButton";
import LocaleButton from "../../shared/localeButton";

const Preferences = () => {

    return (
        <div className={styles.preferencesContainer}>
            <ThemeButton />
            <LocaleButton />
        </div>
    );
};

export default Preferences;
