import styles from "./Modal.module.scss";
import { TModalProps } from "./Modal.types";
import { useToggleModal } from "./Modal.hooks";

const Modal = ({ props, children }: TModalProps) => {
    const toggleModalData = useToggleModal({ props });

    if (!toggleModalData.shouldModalRender) {
        return null;
    }

    return (
        <div className={toggleModalData.overlayClassName} onClick={props.onClose}>
            <div
                className={toggleModalData.modalClassName}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modalHeader} data-variant={props.variant}>
                    <h2 className={styles.title}>{props.title}</h2>
                    <button type="button" className={styles.closeBtn} onClick={props.onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
