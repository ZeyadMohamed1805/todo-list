import { useCallback, useEffect, useState } from 'react';
import { TUseTodoProgressProps } from './Table.types';
import styles from './Table.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../../services/Api.service';
import { getToastDataFromError, showToast } from '../../shared/toast/Toast.service';
import { VariantsEnum } from '../../../enums';

export const useTodoListProgress = ({ props }: TUseTodoProgressProps) => {
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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>();
  const dropdownClassName = `${styles.dropdown} ${isDropdownOpen ? styles.show : isDropdownOpen === false ? styles.hide : ''}`;

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((previousIsDropdownOpen) => !previousIsDropdownOpen);
  }, []);

  return { dropdownClassName, toggleDropdown };
};

export const useRequestTodoLists = () => {
  return useQuery({
    queryKey: ['todoLists'],
    queryFn: async () => {
      try {
        const response = await api.get('/todo-lists');

        return response.data.data;
      } catch (error) {
        const toastData = getToastDataFromError(error);

        showToast(toastData);
      }
    }
  });
}

export const useDeleteTodoListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoListId: string) => api.delete(`/todo-lists/${todoListId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todoLists'] });
      showToast({
        message: 'todo_list_deleted',
        variant: VariantsEnum.SUCCESS
      });
    },
    onError: (error) => {
      const toastData = getToastDataFromError(error);
      showToast(toastData);
    }
  });
}