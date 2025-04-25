import { useEffect } from "react";
import { TUseKeyBindDeleteModalProps } from "./DeleteModal.types";

export const useKeyBindDeleteModal = ({ props }: TUseKeyBindDeleteModalProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!props.isDeleteModalOpen) return;

            if (event.key === "Enter") {
                props.onConfirm();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [props]);
}