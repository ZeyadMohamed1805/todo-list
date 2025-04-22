import styles from './Title.module.scss';
import { TTitleProps } from './Title.types';

const Title = ({ props }: TTitleProps) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{props.title}</h1>
            {props.date && <p className={styles.date}>{props.date}</p>}
        </div>
    );
};

export default Title;
