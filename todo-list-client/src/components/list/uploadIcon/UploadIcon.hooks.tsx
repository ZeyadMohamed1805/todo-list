import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { getToastDataFromError, showToast } from "../../shared/toast/Toast.service";
import { VariantsEnum } from "../../../enums";
import api from "../../../services/Api.service";
import { showLoading } from "../../shared/loading/Loading.service";

export const useUploadIcon = () => {
    const uploadIconMutation = useUploadIconMutation();

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                showLoading();
                uploadIconMutation.mutate(file);
            }
        },
    });

    return { getRootProps, getInputProps };
}

const useUploadIconMutation = () => {
    const params = useParams();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['uploadIcon'],
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('icon', file);

            const response = await api.post(`/todo-lists/${params.listId}/upload-icon`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoListById'] });

            showToast({
                variant: VariantsEnum.SUCCESS,
                message: 'icon_uploaded',
            });
        },
        onError: (error) => {
            const toastData = getToastDataFromError(error);
            showToast(toastData);
        }
    });
}