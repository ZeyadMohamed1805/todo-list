import styles from './UploadIcon.module.scss';
import { TUploadIconProps } from './UploadIcon.types';

const UploadIcon = ({ props }: TUploadIconProps) => {
    return (
        <div
            {...props.getRootProps()}
            className={styles.uploadContainer}
        >
            <input {...props.getInputProps()} />
            <p>Drag & Drop or Click to Upload Icon</p>
        </div>
    );
};

export default UploadIcon;