import styles from "./Description.module.scss";

const Description = () => {
    return (
        <div className={styles.description}>
            <img className={styles.descriptionLogo} src="/images/nagwa-logo-icon.svg" alt="Nagwa" />
            <h1 className={styles.descriptionTitle}>Manage Your Tasks</h1>
            <p className={styles.descriptionSubtitle}>
                Join our community and take your management skills to the next level!
            </p>
        </div>
    );
};

export default Description;