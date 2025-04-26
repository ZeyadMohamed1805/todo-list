import { useQuery } from "@tanstack/react-query";
import api from "../../../services/Api.service";
import { useNavigate, useParams } from "react-router-dom";
import { getToastDataFromError, showToast } from "../../shared/toast/Toast.service";
import { hideLoading, showLoading } from "../../shared/loading/Loading.service";
import { useTranslation } from "react-i18next";
import { removeLocalStorageItems } from "../../../services/LocalStorage.service";

export const useGetTodoList = () => {
    const params = useParams();
    const { i18n: { language } } = useTranslation();
    const navigate = useNavigate();

    return useQuery({
        queryKey: ['todoListById'],
        queryFn: async () => {
            try {
                showLoading();
                const response = await api.get(`/todo-lists/${params.listId}`);
                
                return response.data.data;
            } catch (error) {
                removeLocalStorageItems(['token', 'username']);
                navigate(`/${language}/auth`);
                
                const toastData = getToastDataFromError(error);
        
                showToast(toastData);
            } finally {
                hideLoading();
            }
        },
    });
}