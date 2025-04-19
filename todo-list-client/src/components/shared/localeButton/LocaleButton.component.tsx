import styles from './LocaleButton.module.scss';
import { useLocaleButton } from './LocaleButton.hooks';
import { useTranslation } from 'react-i18next';

const LocaleButton = () => {
  const { t } = useTranslation();
  const localeButtonData = useLocaleButton();

  return (
    <button type="button" onClick={localeButtonData.toggleLocale} className={styles.localeButton}>
      {t('language')}
    </button>
  );
};

export default LocaleButton;
