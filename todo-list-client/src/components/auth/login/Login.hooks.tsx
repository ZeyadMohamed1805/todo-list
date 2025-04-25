import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginSchema } from './Login.schema';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import api from '../../../services/Api.service';
import { TLoginData, TLoginResponse } from './Login.types';
import { showToast } from '../../shared/toast/Toast.service';
import { getToastDataFromError } from '../../shared/toast/Toast.service';
import { setLocalStorageItem } from '../../../services/LocalStorage.service';
import { AxiosResponse } from 'axios';
import { VariantsEnum } from '../../../enums';
import { hideLoading, showLoading } from '../../shared/loading/Loading.service';

export const useLogin = () => {
  const loginMutation = useLoginMutation();
  const formData = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'all',
    defaultValues: {
      rememberMe: false,
    }
  });

  const onSubmit = formData.handleSubmit((data) => {
    showLoading();
    loginMutation.mutate(data);
  });

  return { formData, onSubmit };
};

const useLoginMutation = () => {
  const navigate = useNavigate();
  const { i18n: { language } } = useTranslation();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: TLoginData) => api.post('/auth/login', data),
    onSuccess: (response) => {
      const username = (response as AxiosResponse<TLoginResponse>).data?.user?.username;
          
          if (username) {
            setLocalStorageItem('username', username);
            setLocalStorageItem('token', response.data.token);
            navigate(`/${language}/home`);
          } else {
            showToast({
              message: 'something_went_wrong',
              variant: VariantsEnum.ERROR,
            });
          }
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