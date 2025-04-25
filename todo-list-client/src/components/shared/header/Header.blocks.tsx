import { useTranslation } from 'react-i18next';
import { HEADER_DROPDOWN_BUTTONS } from './Header.constants';
import { useSignout, useToggleDropdown } from './Header.hooks';
import styles from './Header.module.scss';
import { THeaderBadgeProps, THeaderDropdownButtons } from './Header.types';
import { getLocalStorageItem } from '../../../services/LocalStorage.service';
import { useClickOutside } from '../../../hooks/useClickOutside';

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

const HeaderDropdownButtons = ({ props }: THeaderDropdownButtons) => {
  return HEADER_DROPDOWN_BUTTONS.map((DropdownButton, index) => (
    <li key={index} onClick={props.closeDropdown}>
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
  const clickOutsideRefs = useClickOutside<HTMLDivElement>(toggleDropdownData.closeDropdown);

  return (
    <div className={styles.controls} ref={clickOutsideRefs.elementRef}>
      <HeaderBadge props={toggleDropdownData} />

      <ul className={toggleDropdownData.dropdownClassName}>
        <HeaderDropdownButtons props={{ closeDropdown: toggleDropdownData.closeDropdown }} />

        <HeaderSignoutButton />
      </ul>
    </div>
  );
};
