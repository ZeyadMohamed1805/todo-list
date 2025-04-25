import styles from './Header.module.scss';
import { HeaderControls, HeaderLogo } from './Header.blocks';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const hideHeader = !location.pathname.includes('home') && !location.pathname.includes('lists');

  if (hideHeader) {
    return null;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <HeaderLogo />

        <HeaderControls />
      </nav>
    </header>
  );
};

export default Header;
