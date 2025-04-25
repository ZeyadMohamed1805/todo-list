import { useCallback, useEffect, useRef, useState } from "react";
import { TPatchTaskData, TTaskRowProps, TUseDeleteTaskMutation, TUseDragAndDropTaskRowsProps, TUseHandleTaskTitleBlur, TUseHandleTaskTitleKeyDown, TUseInitializeTaskTitleInnerText, TUseVerticalDrag } from "./Tasks.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/Api.service";
import { useParams } from "react-router-dom";
import { getToastDataFromError, showToast } from "../../shared/toast/Toast.service";
import { VariantsEnum } from "../../../enums";
import _ from "lodash";
import { hideLoading, showLoading } from "../../shared/loading/Loading.service";

export const useGetTasksByTodoListId = () => {
    const params = useParams();

    return useQuery({
        queryKey: ['tasks', params.listId],
        queryFn: async () => {
            try {
                const response = await api(`/tasks/todo-list/${params.listId}`);
                return response.data.data;
            } catch (error) {
                const toastData = getToastDataFromError(error);
                showToast(toastData);
            } finally {
                hideLoading();
            }
        }
    });
}

export const useDeleteTaskMutation = ({ props }: TUseDeleteTaskMutation) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteTask'],
        mutationFn: async (taskId: string) => {
            const response = await api.delete(`/tasks/${taskId}`);
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['todoListById'] });

            props.setIsDeleteModalOpen(false);

            showToast({
                message: "task_deleted",
                variant: VariantsEnum.SUCCESS
            });
        },
        onError: (error) => {
            const toastData = getToastDataFromError(error);
            showToast(toastData);
        },
        onSettled: () => {
            hideLoading();
        }
    });
}

export const usePatchTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['patchTask'],
        mutationFn: async ({ taskId, data }: TPatchTaskData) => {
            const response = await api.patch(`/tasks/${taskId}`, data);
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['todoListById'] });

            showToast({
                message: "task_updated",
                variant: VariantsEnum.SUCCESS
            });
        },
        onError: (error) => {
            const toastData = getToastDataFromError(error);
            showToast(toastData);
        },
        onSettled: () => {
            hideLoading();
        }
    });
}

export const useKeyBindTodoList = () => {
    const [focusedTaskIndex, setFocusedTaskIndex] = useState(-1);
    const taskRefs = useRef<(HTMLDivElement | null)[]>([]);

    const focusOnTask = useCallback((index: number) => {
        const taskElement = taskRefs.current[index];
        if (taskElement) {
            taskElement.focus();
            setFocusedTaskIndex(index);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = Math.min(focusedTaskIndex + 1, taskRefs.current.length - 1);
                focusOnTask(nextIndex);
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = Math.max(focusedTaskIndex - 1, 0);
                focusOnTask(prevIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focusedTaskIndex, focusOnTask]);

    return { taskRefs };
};

export const useInitializeTaskTitleInnerText = ({ props }: TUseInitializeTaskTitleInnerText) => {
    const [taskTitle, setTaskTitle] = useState(props.task.title);

    useEffect(() => {
        if (props.titleRef.current) {
            props.titleRef.current.innerText = props.task.title;
        }
    }, [props.task.title, props.titleRef]);

    return { taskTitle, setTaskTitle };
}

export const useHandleTaskRowKeyDown = ({ props }: TTaskRowProps) => {
    const patchTaskMutation = usePatchTaskMutation();

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
                    props.setIsChecked((previousIsCheckedValue) => {
                        const newIsCheckedValue = !previousIsCheckedValue;

                        showLoading();
                        
                        patchTaskMutation.mutate({
                            taskId: props.task.id,
                            data: { isCompleted: newIsCheckedValue }
                        });

                        return newIsCheckedValue;
                    });
                    break;
                case 'Delete':
                    event.preventDefault();
                    props.setIsDeleteModalOpen(true);
                    event.currentTarget.blur();
                    break;
            }
        }
    }, [props, patchTaskMutation]);

    return handleKeyDown;
}

export const useHandleTaskTitleBlur = ({ props }: TUseHandleTaskTitleBlur) => {
    const patchTaskMutation = usePatchTaskMutation();

    const handleBlur = useCallback((event: React.FocusEvent<HTMLSpanElement>) => {
        const newTitle = event.currentTarget.innerText.trim();
        if (newTitle && newTitle !== props.task.title) {
            event.currentTarget.innerText = newTitle;

            showLoading();

            patchTaskMutation.mutate({
                taskId: props.task.id,
                data: { title: newTitle }
            });

            props.setTaskTitle(newTitle);
        }
    }, [props, patchTaskMutation]);

    return handleBlur;
}

export const useHandleTaskTitleKeyDown = ({ props }: TUseHandleTaskTitleKeyDown) => {
    const patchTaskMutation = usePatchTaskMutation();

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.target === event.currentTarget) {
            switch (event.key) {
                case 'Enter':
                    event.preventDefault();
                    event.currentTarget.blur();

                    showLoading();

                    patchTaskMutation.mutate({
                        taskId: props.taskId,
                        data: { title: event.currentTarget.innerText.trim() }
                    });
                    break;
                case 'Escape':
                    event.preventDefault();
                    event.currentTarget.innerText = props.taskTitle;
                    event.currentTarget.blur();
                    break;
            }
        }
    }, [props.taskTitle, props.taskId, patchTaskMutation]);

    return handleKeyDown;
}

export const useVerticalDragItems = <T extends { id: string|number; }>({ draggingId, setItems }: TUseVerticalDrag<T>) => {
    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>, targetId: string) => {
            event.preventDefault();

            if (!draggingId || draggingId === targetId) return;

            const targetElement = event.currentTarget;
            const { top, left, width, height } = targetElement.getBoundingClientRect();

            const horizontalThreshold = width * 0.5;
            const verticalThreshold = height * 0.5;

            const { clientX, clientY } = event;

            const crossedHorizontal = Math.abs(clientX - left) < horizontalThreshold;
            const crossedVertical = Math.abs(clientY - top) < verticalThreshold;

            if (!crossedHorizontal && !crossedVertical) return;

            setItems((prevItems) => {
                const draggedIndex = prevItems.findIndex((item) => item.id === draggingId);
                const targetIndex = prevItems.findIndex((item) => item.id === targetId);

                if (draggedIndex === -1 || targetIndex === -1) return prevItems;

                const newItems = [...prevItems];
                const [draggedItem] = newItems.splice(draggedIndex, 1);
                newItems.splice(targetIndex, 0, draggedItem);

                return newItems.map((item, index) => ({ ...item, order: index }));
            });
        },
        [draggingId, setItems]
    );

    return { handleDragOver };
};

export const useDragAndDropTaskRows = ({ props }: TUseDragAndDropTaskRowsProps) => {
    const previousTasks = useRef(props.tasks ?? []);
    const [tasks, setTasks] = useState(props.tasks ?? []);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const dragStartPosition = useRef<{ x: number; y: number } | null>(null);
    const { handleDragOver } = useVerticalDragItems({ draggingId, setItems: setTasks });
    const patchTaskMutation = usePatchTaskMutation();

    const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, id: string) => {
        setDraggingId(id);
        dragStartPosition.current = { x: event.clientX, y: event.clientY };
    }, []);

    const handleDrop = useCallback(() => {
        if (draggingId) {
            showLoading();

            patchTaskMutation.mutate({
                taskId: draggingId,
                data: { order: tasks.findIndex((task) => task.id === draggingId) }
            });
        }

        setDraggingId(null);
        dragStartPosition.current = null;
    }, [draggingId, patchTaskMutation, tasks]);
    
    useEffect(() => {
        if (!_.isEqual(previousTasks.current, props.tasks)) {
            previousTasks.current = props.tasks ?? [];
            setTasks(props.tasks ?? []);
        }
    }, [props.tasks]);

    return { tasks, setTasks, handleDragStart, handleDragOver, handleDrop }
}