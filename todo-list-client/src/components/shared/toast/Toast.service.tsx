import { AxiosError } from "axios";
import { TError } from "../../../types/error";
import { VariantsEnum } from "../../../enums";
import { ToastProps } from "./Toast.types";

let showToastHandler: ((options: ToastProps) => void) | null = null;
let hideToastHandler: (() => void) | null = null;

export const setToastHandlers = (
    showHandler: (options: ToastProps) => void,
    hideHandler: () => void
) => {
    showToastHandler = showHandler;
    hideToastHandler = hideHandler;
};

export const showToast = (options: ToastProps) => {
    if (showToastHandler) {
        showToastHandler(options);
    }
};

export const hideToast = () => {
    if (hideToastHandler) {
        hideToastHandler();
    }
};

export const getToastDataFromError = (error: Error | unknown) => {
    const errorMessage = (error as AxiosError<TError>).response?.data?.message || 'something_went_wrong';

    return {
        message: errorMessage,
        variant: VariantsEnum.ERROR
    };
}