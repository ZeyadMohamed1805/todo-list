import { useQuery } from "@tanstack/react-query";
import api from "../../../services/Api.service";
import { useParams } from "react-router-dom";
import { getToastDataFromError, showToast } from "../../shared/toast/Toast.service";

export const useGetTodoList = () => {
    const params = useParams();

    return useQuery({
        queryKey: ['todoListById'],
        queryFn: async () => {
            try {
                const response = await api.get(`/todo-lists/${params.listId}`);
                
                return response.data.data;
            } catch (error) {
                const toastData = getToastDataFromError(error);
                showToast(toastData);
            }
        },
    });
}