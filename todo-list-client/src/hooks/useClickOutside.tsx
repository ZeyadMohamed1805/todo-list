import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
    callback: () => void,
    excludedRefs: Array<RefObject<T | null>> = []
) => {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedInsideElement = elementRef.current?.contains(target);
            const clickedInsideExcluded = excludedRefs.some(ref => ref.current?.contains(target));

            if (!clickedInsideElement && !clickedInsideExcluded) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [callback, excludedRefs]);

    return { elementRef };
};
