let showLoadingHandler: (() => void) | null = null;
let hideLoadingHandler: (() => void) | null = null;

export const setLoadingHandlers = (
    showHandler: () => void,
    hideHandler: () => void
) => {
    showLoadingHandler = showHandler;
    hideLoadingHandler = hideHandler;
};

export const showLoading = () => {
    if (showLoadingHandler) showLoadingHandler();
};

export const hideLoading = () => {
    if (hideLoadingHandler) hideLoadingHandler();
};
