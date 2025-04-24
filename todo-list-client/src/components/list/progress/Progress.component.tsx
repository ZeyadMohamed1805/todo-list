import styles from './Progress.module.scss';
import { TProgressProps } from './Progress.types';
import { useTodoListProgressCompleted } from './Progress.hooks';

const Progress = ({ props }: TProgressProps) => {
  const todoListProgressProgressData = useTodoListProgressCompleted({ props });
  console.log(props.progress);
  

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${todoListProgressProgressData.progress}%` }}
        />
        <span className={styles.progress}>{props.progress.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default Progress;
