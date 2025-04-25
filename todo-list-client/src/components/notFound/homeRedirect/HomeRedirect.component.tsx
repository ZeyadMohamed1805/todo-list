import { useNavigate } from "react-router-dom";
import styles from  "./HomeRedirect.module.scss";
import { useTranslation } from "react-i18next";

const HomeRedirect = () => {
    const navigate = useNavigate();
    const { i18n: { language }} = useTranslation();

    return (
        <div className={styles.content}>
            <button type='button' className={styles.button} onClick={() => navigate(`/${language}/home`)}>
                Return Home
            </button>
        </div>
    );
};

export default HomeRedirect;
