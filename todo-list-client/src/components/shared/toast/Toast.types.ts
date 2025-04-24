import { VariantsEnum } from "../../../enums";
import { EToastActionTypes } from "./Toast.enums";

export type ToastProps = {
    message: string;
    variant: VariantsEnum;
};

export type TToastMessageProps = {
    props: {
        message: string;
    };
};

export type TToastCloseButtonProps = {
    props: {
        hideToast: () => void;
    };
};

export type TToastState = {
    message: string;
    isDisplayed: boolean;
    isHiding: boolean;
    variant: VariantsEnum;
};

export type TToastAction =
    | { type: EToastActionTypes.SHOW; payload: { message: string; variant: VariantsEnum } }
    | { type: EToastActionTypes.HIDE }
    | { type: EToastActionTypes.RESET };