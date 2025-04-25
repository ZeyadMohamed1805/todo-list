import { useMemo } from 'react';
import styles from './Title.module.scss';
import { formatDate } from './Title.service';
import { TTitleProps } from './Title.types';

const Title = ({ props }: TTitleProps) => {
  const formattedDate = useMemo(() => formatDate(props.createdAt), [props.createdAt]);

  return (
    <div className={styles.wrapper}>
      {
        props.imagePath ? (
          <img
            src={`${import.meta.env.VITE_IMAGES_BASE_URL}/${props.imagePath}`}
            alt="image_path"
            className={styles.icon}
          />
        ) :
        <span className={styles.icon}>📋 </span>
      }
      <div className={styles.titleContent}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.date}>
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default Title;
