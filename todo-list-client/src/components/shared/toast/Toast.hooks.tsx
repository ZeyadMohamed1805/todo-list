import { useCallback, useEffect, useReducer, useRef } from "react";
import { TOAST_ANIMATION_TIMEOUT, TOAST_HIDE_TIMEOUT, TOAST_INITIAL_STATE } from "./Toast.constants";
import { toastReducer } from "./Toast.reducer";
import { EToastActionTypes } from "./Toast.enums";
import { ToastProps } from "./Toast.types";
import { useTranslation } from "react-i18next";
import { setToastHandlers } from "./Toast.service";

export const useToast = () => {
    const { t } = useTranslation(); 
    const [toastState, dispatchToast] = useReducer(toastReducer, TOAST_INITIAL_STATE);
    const toastTimeoutRef = useRef<number>(null);

    const hideToast = useCallback(() => {
        dispatchToast({ type: EToastActionTypes.HIDE });
        setTimeout(() => {
            dispatchToast({ type: EToastActionTypes.RESET });
        }, TOAST_ANIMATION_TIMEOUT);
    }, []);

    const showToast = useCallback((options: ToastProps) => {
        if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
        }

        dispatchToast({
            type: EToastActionTypes.SHOW,
            payload: {
                message: t(options.message),
                variant: options.variant,
            },
        });

        toastTimeoutRef.current = setTimeout(() => {
            hideToast();
        }, TOAST_HIDE_TIMEOUT);
    }, [t, hideToast]);

    useEffect(() => {
        setToastHandlers(showToast, hideToast);
    }, [showToast, hideToast]);

    return { ...toastState, hideToast };
};