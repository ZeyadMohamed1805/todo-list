import { useTranslation } from "react-i18next";
import { VariantsEnum } from "../../../enums";
import styles from "./DeleteModal.module.scss";
import { TDeleteModalProps } from "./DeleteModal.types";
import Modal from "../modal";

const DeleteModal = ({ props }: TDeleteModalProps) => {
    const { t } = useTranslation();

    return (
        <Modal
            props={{
                isOpen: props.isDeleteModalOpen,
                onClose: props.onClose,
                title: t("delete"),
                variant: VariantsEnum.ERROR
            }}
        >
            <div className={styles.deleteModalContent}>
                <p className={styles.deleteMessage}>{t("delete_confirmation")}</p>
                <div className={styles.deleteModalActions}>
                    <button type="button" className={styles.confirm} onClick={props.onConfirm}>
                        {t("confirm")}  
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
