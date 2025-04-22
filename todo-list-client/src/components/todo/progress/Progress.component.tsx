import styles from './Progress.module.scss';
import { TProgressProps } from './Progress.types';
import { useTodoListPercentageCompleted } from './Progress.hooks';

const Progress = ({ props }: TProgressProps) => {
    const todoListPercentageProgressData = useTodoListPercentageCompleted({ props });

    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                <div
                    className={styles.fill}
                    style={{ width: `${todoListPercentageProgressData.percentage}%` }}
                />
                <span className={styles.percentage}>
                    {props.percentage.toFixed(0)}%
                </span>
            </div>
        </div>
    );
}


export default Progress;
