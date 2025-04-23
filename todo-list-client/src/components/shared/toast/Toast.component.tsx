import styles from "./Toast.module.scss";
import { useToast } from "./Toast.hooks";
import { ToastCloseButton, ToastMessage } from "./Toast.blocks";

export const Toast = () => {
    const toastData = useToast();

    if (!toastData.isDisplayed) {
        return null;
    }

    return (
        <div
            data-variant={toastData.variant}
            className={`${styles.toast} ${toastData.isHiding ? styles.exit : ""}`}
            role="alert"
        >
            <ToastMessage props={toastData} />
            <ToastCloseButton props={toastData} />
        </div>
    );
};

export default Toast;