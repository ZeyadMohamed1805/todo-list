import { useEffect, useReducer, useCallback } from "react";
import { loadingReducer } from "./Loading.reducer";
import { ELoadingActionTypes } from "./Loading.enums";
import { setLoadingHandlers } from "./Loading.service";
import { INITIAL_STATE } from "./Loading.constants";

export const useLoading = () => {
    const [state, dispatch] = useReducer(loadingReducer, INITIAL_STATE);

    const showLoading = useCallback(() => {
        dispatch({ type: ELoadingActionTypes.SHOW });
    }, []);

    const hideLoading = useCallback(() => {
        dispatch({ type: ELoadingActionTypes.HIDE });
    }, []);

    useEffect(() => {
        setLoadingHandlers(showLoading, hideLoading);
    }, [showLoading, hideLoading]);

    return { ...state };
};
