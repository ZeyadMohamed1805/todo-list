import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../../services/Api.service";
import { useParams } from "react-router-dom";
import { TCreateTaskData } from "./CreateTask.types";
import { getToastDataFromError, showToast } from "../../shared/toast/Toast.service";
import { VariantsEnum } from "../../../enums";
import { useForm } from "react-hook-form";

export const useCreateTaskFormData = () => {
    const createTaskMutation = useCreateTaskMutation();
    const formData = useForm<TCreateTaskData>({
        mode: 'all',
    });

    const onSubmit = formData.handleSubmit((data) => {
        if (!data.title) return;

        createTaskMutation.mutate(
            data,
            {
                onSuccess: () => {
                    formData.reset();
                },
            }
        );
    });

    return { formData, onSubmit };
}

export const useCreateTaskMutation = () => {
    const queryClient = useQueryClient();
    const params = useParams();

    return useMutation({
        mutationFn: (data: TCreateTaskData) => api.post(`/tasks/todo-list/${params.listId}`, data),
        mutationKey: ['todoLists'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.invalidateQueries({ queryKey: ['todoListById'] });

            showToast({
                message: "task_created",
                variant: VariantsEnum.SUCCESS,
            });
        },
        onError: (error) => {
            const toastData = getToastDataFromError(error);
            showToast(toastData);
        },
    });
}