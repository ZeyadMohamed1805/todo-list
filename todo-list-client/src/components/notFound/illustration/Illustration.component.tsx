import styles from "./Illustration.module.scss";

const Illustration = () => {
    return (
        <div className={styles.illustration}>
            <img src="/images/not-found.png" alt="404 Not Found" />
        </div>
    );
};

export default Illustration;
