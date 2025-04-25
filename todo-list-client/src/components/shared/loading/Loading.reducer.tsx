import { ELoadingActionTypes } from "./Loading.enums";

type LoadingState = { isVisible: boolean };
type Action = { type: ELoadingActionTypes };

export const loadingReducer = (state: LoadingState, action: Action): LoadingState => {
    switch (action.type) {
        case ELoadingActionTypes.SHOW:
            return { isVisible: true };
        case ELoadingActionTypes.HIDE:
            return { isVisible: false };
        default:
            return state;
    }
};
