import { VariantsEnum } from "../../../enums";
import { TToastState } from "./Toast.types";

export const TOAST_INITIAL_STATE: TToastState = {
    message: "Something went wrong",
    isDisplayed: false,
    isHiding: false,
    variant: VariantsEnum.ERROR,
};

export const TOAST_ANIMATION_TIMEOUT = 500;
export const TOAST_HIDE_TIMEOUT = 5000;