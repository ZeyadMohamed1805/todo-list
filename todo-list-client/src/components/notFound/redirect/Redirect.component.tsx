import styles from  "./Redirect.module.scss";
import { useRedirect } from "./Redirect.hooks";

const Redirect = () => {
    const redirectData = useRedirect();

    return (
        <div className={styles.content}>
            <button type='button' className={styles.button} onClick={redirectData.redirect}>
                {redirectData.redirectText}
            </button>
        </div>
    );
};

export default Redirect;
