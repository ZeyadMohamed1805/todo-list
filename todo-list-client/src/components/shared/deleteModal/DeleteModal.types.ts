export type TDeleteModalProps = {
    props: {
        isDeleteModalOpen: boolean | undefined;
        setIsDeleteModalOpen: (isOpen: boolean) => void;
        onClose: () => void;
        onConfirm: () => void;
    }
};