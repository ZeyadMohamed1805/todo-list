import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const navigate = useNavigate();
    const { i18n: { language }} = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.illustration}>
                <img src="/images/not-found.png" alt="404 Not Found" />
            </div>
            <div className={styles.content}>
                <button type='button' className={styles.button} onClick={() => navigate(`/${language}/home`)}>
                    Return Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
