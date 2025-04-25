import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NewListSchema } from './NewListForm.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TCreateTodoListData, TUseCreateNewListProps, TUseCreateTodoListMutationProps } from './NewListForm.types';
import api from '../../../services/Api.service';
import { getToastDataFromError, showToast } from '../../shared/toast/Toast.service';
import { VariantsEnum } from '../../../enums';
import { hideLoading, showLoading } from '../../shared/loading/Loading.service';

export const useCreateNewList = ({ props }: TUseCreateNewListProps) => {
  const createTodoListMutation = useCreateTodoListMutation({ props });
  const formData = useForm({
    resolver: yupResolver(NewListSchema),
    mode: 'all',
  });

  const onSubmit = formData.handleSubmit((data) => {
    showLoading();
    createTodoListMutation.mutate(
      data,
      {
        onSuccess: () => {
          formData.reset();
        }
      }
    );
  });

  return { formData, onSubmit };
};

const useCreateTodoListMutation = ({ props }: TUseCreateTodoListMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateTodoListData) => api.post('/todo-lists', data),
    mutationKey: ['todoLists'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoLists'] });
      props.setIsNewListModalOpen(false);
      
      showToast({
        message: 'todo_list_created',
        variant: VariantsEnum.SUCCESS,
      });
    },
    onError: (error) => {
      const toastData = getToastDataFromError(error);
      showToast(toastData);
    },
    onSettled: () => {
      hideLoading();
    },
  });
};