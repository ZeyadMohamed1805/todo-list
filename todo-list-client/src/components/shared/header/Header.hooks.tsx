import { useCallback, useState } from 'react';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useToggleDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>();
  const arrowClassName = `${styles.arrowIcon} ${isDropdownOpen ? styles.rotate : ''}`;
  const dropdownClassName = `${styles.dropdown} ${isDropdownOpen ? styles.show : isDropdownOpen === false ? styles.hide : ''}`;

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  return { toggleDropdown, arrowClassName, dropdownClassName };
};

export const useSignout = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    navigate(`/${language}/auth`);
  }, [language, navigate]);

  return { signOut };
};
