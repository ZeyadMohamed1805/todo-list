import { TToastAction, TToastState } from "./Toast.types";

export const toastReducer = (state: TToastState, action: TToastAction) => {
    switch (action.type) {
        case "SHOW":
            return {
                ...state,
                message: action.payload.message,
                variant: action.payload.variant,
                isDisplayed: true,
                isHiding: false,
            };
        case "HIDE":
            return {
                ...state,
                isHiding: true,
            };
        case "RESET":
            return {
                ...state,
                isDisplayed: false,
                isHiding: false,
            };
        default:
            return state;
    }
}