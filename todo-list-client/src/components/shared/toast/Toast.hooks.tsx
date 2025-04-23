import { useCallback, useReducer } from "react";
import { TOAST_INITIAL_STATE } from "./Toast.constants";
import { toastReducer } from "./Toast.reducer";
import { EToastActionTypes } from "./Toast.enums";
import { ToastProps } from "./Toast.types";

export let showToast: (options: ToastProps) => void;
export let hideToast: () => void;

export const useToast = () => {
    const [toastState, dispatchToast] = useReducer(toastReducer, TOAST_INITIAL_STATE);

    showToast = useCallback((payload: ToastProps) => {
        dispatchToast({
            type: EToastActionTypes.SHOW,
            payload,
        });
    }, []);

    hideToast = useCallback(() => {
        dispatchToast({ type: EToastActionTypes.HIDE });
    }, []);

    return { ...toastState, hideToast };
};