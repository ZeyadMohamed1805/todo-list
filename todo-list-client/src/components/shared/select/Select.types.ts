import { Dispatch, SetStateAction } from "react";

type TOption = {
    value: string | number;
    label: string;
}

export type TOptionsProps = {
    props: {
        options: Array<TOption>;
    }
}

export type TSelectProps = {
    props: {
        title: string;
        selectedOption: string | number;
        setSelectedOption: Dispatch<SetStateAction<string | number>>;
        options: Array<TOption>;
    };
}