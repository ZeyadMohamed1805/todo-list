import { useUploadIcon } from './UploadIcon.hooks';
import styles from './UploadIcon.module.scss';

const UploadIcon = () => {
    const uploadIconData = useUploadIcon();

    return (
        <div
            {...uploadIconData.getRootProps()}
            className={styles.uploadContainer}
        >
            <input {...uploadIconData.getInputProps()} />
            <p>Drag & Drop or Click to Upload Icon</p>
        </div>
    );
};

export default UploadIcon;