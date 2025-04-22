import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NewListSchema } from './NewListForm.schema';

export const useCreateNewList = () => {
  const formData = useForm({
    resolver: yupResolver(NewListSchema),
    mode: 'all',
  });

  const onSubmit = formData.handleSubmit((data) => {
    console.log(data);
  });

  return { formData, onSubmit };
};
