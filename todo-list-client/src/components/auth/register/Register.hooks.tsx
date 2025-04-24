import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RegisterSchema from './Register.schema';
import { getToastDataFromError, showToast } from '../../shared/toast/Toast.service';
import { useMutation } from '@tanstack/react-query';
import api from '../../../services/Api.service';
import { VariantsEnum } from '../../../enums';
import { TRegisterData } from './Register.types';

export const useRegister = () => {
  const registerMutation = useRegisterMutation();
  const formData = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: 'all',
  });

  const onSubmit = formData.handleSubmit((data) => {
    registerMutation.mutate(
      data,
      {
        onSuccess: () => {
          formData.reset();
        },
      }
    );
  });

  return { formData, onSubmit };
};

const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: TRegisterData) => api.post('/auth/register', data),
    onSuccess: () => {
      showToast({
        message: 'register_success',
        variant: VariantsEnum.SUCCESS,
      });
    },
    onError: (error) => {
      const toastData = getToastDataFromError(error);

      showToast(toastData);
    },
  })
}