import { useTranslation } from 'react-i18next';
import { HEADER_DROPDOWN_BUTTONS } from './Header.constants';
import { useSignout, useToggleDropdown } from './Header.hooks';
import styles from './Header.module.scss';
import { THeaderBadgeProps } from './Header.types';
import { getLocalStorageItem } from '../../../services/LocalStorage.service';

export const HeaderLogo = () => {
  return <img src="/images/nagwa-logo-light.svg" alt="Logo" className={styles.logo} />;
};

const HeaderBadge = ({ props }: THeaderBadgeProps) => {
  const username = getLocalStorageItem('username');

  return (
    <div className={styles.badge} onClick={props.toggleDropdown}>
      {username} <span className={props.arrowClassName}>▾</span>
    </div>
  );
};

const HeaderDropdownButtons = () => {
  return HEADER_DROPDOWN_BUTTONS.map((DropdownButton, index) => (
    <li key={index}>
      <DropdownButton />
    </li>
  ));
};

const HeaderSignoutButton = () => {
  const signoutData = useSignout();
  const { t } = useTranslation();

  return (
    <li className={styles.signOut}>
      <button type="button" className={styles.signOut} onClick={signoutData.signOut}>
        {t('sign_out')}
      </button>
    </li>
  );
};

export const HeaderControls = () => {
  const toggleDropdownData = useToggleDropdown();

  return (
    <div className={styles.controls}>
      <HeaderBadge props={toggleDropdownData} />

      <ul className={toggleDropdownData.dropdownClassName}>
        <HeaderDropdownButtons />

        <HeaderSignoutButton />
      </ul>
    </div>
  );
};
