import { useCallback, useEffect, useRef, useState } from "react";
import { TTodoRowProps, TUseHandleTodoTitleBlur, TUseHandleTodoTitleKeyDown, TUseInitializeTodoTitleInnerText } from "./Todos.types";

export const useKeyBindTodoList = () => {
    const [focusedTodoIndex, setFocusedTodoIndex] = useState(-1);
    const todoRefs = useRef<(HTMLDivElement | null)[]>([]);

    const focusOnTodo = useCallback((index: number) => {
        const todoElement = todoRefs.current[index];
        if (todoElement) {
            todoElement.focus();
            setFocusedTodoIndex(index);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = Math.min(focusedTodoIndex + 1, todoRefs.current.length - 1);
                focusOnTodo(nextIndex);
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = Math.max(focusedTodoIndex - 1, 0);
                focusOnTodo(prevIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusedTodoIndex, focusOnTodo]);

    return { todoRefs };
};

export const useInitializeTodoTitleInnerText = ({ props }: TUseInitializeTodoTitleInnerText) => {
    const [todoTitle, setTodoTitle] = useState(props.todo.title);

    useEffect(() => {
        if (props.titleRef.current) {
            props.titleRef.current.innerText = props.todo.title;
        }
    }, [props.todo.title, props.titleRef]);

    return { todoTitle, setTodoTitle };
}

export const useHandleTodoRowKeyDown = ({ props }: TTodoRowProps) => {
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            switch (event.key) {
                case 'Enter':
                case 'e':
                    event.preventDefault();
                    props.titleRef.current?.focus();
                    break;
                case ' ':
                case 'Spacebar':
                    event.preventDefault();
                    props.setIsChecked((prev) => !prev);
                    break;
                case 'Delete':
                    event.preventDefault();
                    props.setIsDeleteTodoModalOpen(true);
                    event.currentTarget.blur();
                    break;
            }
        }
    }, [props]);

    return handleKeyDown;
}

export const useHandleTodoTitleBlur = ({ props }: TUseHandleTodoTitleBlur) => {
    const handleBlur = useCallback((event: React.FocusEvent<HTMLSpanElement>) => {
        const newTitle = event.currentTarget.innerText.trim();
        if (newTitle && newTitle !== props.todo.title) {
            event.currentTarget.innerText = newTitle;
            props.setTodoTitle(newTitle);
        }
    }, [props]);

    return handleBlur;
}

export const useHandleTodoTitleKeyDown = ({ props }: TUseHandleTodoTitleKeyDown) => {
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    event.currentTarget.blur();
                    break;
                case 'Escape':
                    event.preventDefault();
                    event.currentTarget.innerText = props.todoTitle;
                    event.currentTarget.blur();
                    break;
            }
        }
    }, [props.todoTitle]);

    return handleKeyDown;
}