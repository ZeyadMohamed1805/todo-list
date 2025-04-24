import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NewListSchema } from './NewListForm.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateTodoListData } from './NewListForm.types';
import api from '../../../services/Api.service';
import { getToastDataFromError, showToast } from '../../shared/toast/Toast.service';
import { VariantsEnum } from '../../../enums';

export const useCreateNewList = () => {
  const createTodoListMutation = useCreateTodoListMutation();
  const formData = useForm({
    resolver: yupResolver(NewListSchema),
    mode: 'all',
  });

  const onSubmit = formData.handleSubmit((data) => {
    createTodoListMutation.mutate(
      data,
      {
        onSuccess: () => {
          formData.reset();

          showToast({
            message: 'todo_list_created',
            variant: VariantsEnum.SUCCESS,
          });
        },
        onError: (error) => {
          const toastData = getToastDataFromError(error);
          showToast(toastData);
        },
      }
    );
  });

  return { formData, onSubmit };
};

const useCreateTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateTodoListData) => api.post('/todo-lists', data),
    mutationKey: ['todoLists'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoLists'] });
    },
  });
};