import { Dispatch, SetStateAction } from 'react';

export type TCheckboxProps = {
    props: {
        isChecked: boolean;
        setIsChecked: Dispatch<SetStateAction<boolean>>;
        title: string;
    }
};
