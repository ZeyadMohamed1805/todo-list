import { VariantsEnum } from "../../../enums/variants";

export type TModalProps = {
    props: {
        isOpen: boolean | undefined;
        onClose: () => void;
        title: string;
        variant?: VariantsEnum;
    },
    children: React.ReactNode;
};

export type TUseToggleModalProps = {
    props: {
        isOpen: boolean | undefined;
    };
};