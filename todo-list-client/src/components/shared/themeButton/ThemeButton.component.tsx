import styles from './ThemeButton.module.scss';
import { useThemeButton } from './ThemeButton.hooks';

const ThemeButton = () => {
  const themeButtonData = useThemeButton();

  return (
    <button type="button" onClick={themeButtonData.toggleTheme} className={styles.themeButton}>
      {themeButtonData.themeText}
    </button>
  );
};

export default ThemeButton;
