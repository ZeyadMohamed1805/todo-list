import * as yup from 'yup';

export const NewListSchema = yup.object({
    title: yup.string().required('todo.title_required')
});
