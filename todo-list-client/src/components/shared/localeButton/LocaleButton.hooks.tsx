import { useCallback, useEffect } from 'react';
import { LanguagesEnum, DirectionsEnum } from './LocaleButton.enums';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOCALE_REGEX } from '../../../constants/regex';

export const useLocaleButton = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const dir = language === LanguagesEnum.AR ? DirectionsEnum.RTL : DirectionsEnum.LTR;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLocale = useCallback(() => {
    const newLocale = language === LanguagesEnum.AR ? LanguagesEnum.EN : LanguagesEnum.AR;
    const navigationPath = location.pathname.replace(LOCALE_REGEX, `/${newLocale}`);
    changeLanguage(newLocale);
    navigate(navigationPath, { replace: true });
  }, [language, changeLanguage, navigate, location.pathname]);

  return { toggleLocale };
};
