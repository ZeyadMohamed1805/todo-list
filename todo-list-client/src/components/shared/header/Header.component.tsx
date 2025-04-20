import styles from './Header.module.scss';
import { HeaderControls, HeaderLogo } from './Header.blocks';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isAuthPage = location.pathname.includes('auth');

    if (isAuthPage) {
        return null;
    }

    return (
        <header className={styles.header}>
            <HeaderLogo />
            
            <HeaderControls />
        </header>
    );
};

export default Header;
