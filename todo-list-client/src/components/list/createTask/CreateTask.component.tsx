import { useTranslation } from 'react-i18next';
import Input from '../../shared/input';
import styles from './CreateTask.module.scss';
import { useCreateTaskFormData } from './CreateTask.hooks';
import { FormProvider } from 'react-hook-form';
import SubmitButton from '../../shared/submitButton';

const CreateTask = () => {
    const { t } = useTranslation();
    const createTaskData = useCreateTaskFormData();

    return (
        <FormProvider {...createTaskData.formData}>
            <form className={styles.createTaskForm} onSubmit={createTaskData.onSubmit}>
                <div className={styles.createTodo}>
                    <Input props={{ name: "title", type: "text", placeholder: t("todo.new_todo") }} />
                    <SubmitButton />
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateTask;
