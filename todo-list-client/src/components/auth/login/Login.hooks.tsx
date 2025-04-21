import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginSchema } from './Login.schema';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useLogin = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const formData = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'all',
  });

  const onSubmit = formData.handleSubmit((data) => {
    console.log(data);
    navigate(`/${language}/home`);
  });

  return { formData, onSubmit };
};
