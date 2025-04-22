import { useEffect, useState } from "react";
import { TUseTodoListPercentageCompletedProps } from "./Progress.types";

export const useTodoListPercentageCompleted = ({ props }: TUseTodoListPercentageCompletedProps) => {
    const [percentage, setPercentage] = useState(0);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPercentage(props.percentage);
        }, 250);

        return () => clearTimeout(timeout);
    }, [props.percentage]);

    return { percentage };
};