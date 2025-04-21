import { useCallback, useEffect, useState } from "react";
import { TUseTodoProgressProps } from "./Table.types";
import styles from "./Table.module.scss";

export const useTodoProgress = ({ props }: TUseTodoProgressProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const steps = 60;
        const intervalTime = duration / steps;
        const increment = props.progress / steps;

        const interval = setInterval(() => {
            start += increment;
            if (start >= props.progress) {
                start = props.progress;
                clearInterval(interval);
            }
            setProgress(Math.round(start));
        }, intervalTime);

        return () => clearInterval(interval);
    }, [props.progress]);

    return { progress };
};

export const useToggleDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownClassName = `${styles.dropdown} ${isDropdownOpen ? styles.show : isDropdownOpen === false ? styles.hide : ""}`;

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen((previousIsDropdownOpen) => !previousIsDropdownOpen);
    }, []);

    return { dropdownClassName, toggleDropdown };
}