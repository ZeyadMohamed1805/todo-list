export type TDeleteModalProps = {
    props: {
        isDeleteModalOpen: boolean | undefined;
        setIsDeleteModalOpen: (isOpen: boolean) => void;
        onClose: () => void;
        onConfirm: () => void;
    }
};

export type TUseKeyBindDeleteModalProps = {
    props: {
        isDeleteModalOpen: boolean | undefined;
        onClose: () => void;
        onConfirm: () => void;
    }
};