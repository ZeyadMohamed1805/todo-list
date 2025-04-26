import styles from './UploadIcon.module.scss';
import { useUploadIcon } from './UploadIcon.hooks';
import { useTranslation } from 'react-i18next';

const UploadIcon = () => {
    const uploadIconData = useUploadIcon();
    const { t } = useTranslation()

    return (
        <div
            {...uploadIconData.getRootProps()}
            className={styles.uploadContainer}
        >
            <input {...uploadIconData.getInputProps()} />
            <p>{t("drag_or_click")}</p>
        </div>
    );
};

export default UploadIcon;