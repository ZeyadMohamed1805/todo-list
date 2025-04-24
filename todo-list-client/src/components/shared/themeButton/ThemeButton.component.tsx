import { useTheme } from '../../../hooks';
import styles from './ThemeButton.module.scss';

const ThemeButton = () => {
  const themeData = useTheme();

  return (
    <button type="button" onClick={themeData.toggleTheme} className={styles.themeButton}>
      {themeData.themeText}
    </button>
  );
};

export default ThemeButton;
