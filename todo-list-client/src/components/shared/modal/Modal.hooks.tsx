import { useEffect, useState } from "react";
import { TUseToggleModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";

export const useToggleModal = ({ props }: TUseToggleModalProps) => {
    const [shouldModalRender, setShouldModalRender] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const overlayClassName = `${styles.overlay} ${props.isOpen ? styles.show : ""} ${isModalClosing ? styles.hide : ""}`;
    const modalClassName = `${styles.modal} ${props.isOpen ? styles.show : ""} ${isModalClosing ? styles.hide : ""}`;

    useEffect(() => {
        if (props.isOpen) {
            setShouldModalRender(true);
            setIsModalClosing(false);
        } else if (shouldModalRender) {
            setIsModalClosing(true);
            const timeout = setTimeout(() => {
                setShouldModalRender(false);
                setIsModalClosing(false);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [props.isOpen, shouldModalRender]);

    return { shouldModalRender, overlayClassName, modalClassName }
}