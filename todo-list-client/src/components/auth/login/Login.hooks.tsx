import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginSchema } from './Login.schema';

export const useLogin = () => {
  const formData = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'all',
  });

  const onSubmit = formData.handleSubmit((data) => {
    console.log(data);
  });

  return { formData, onSubmit };
};
