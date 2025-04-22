import SubmitButton from '../../shared/submitButton';
import { NewListFormInputFields } from './NewListForm.blocks';
import { useCreateNewList } from './NewListForm.hooks';
import styles from './NewListForm.module.scss';
import { FormProvider } from 'react-hook-form';

const NewListForm = () => {
    const createNewListData = useCreateNewList();

    return (
        <FormProvider {...createNewListData.formData}>
            <form className={styles.newListForm}>
                <div className={styles.formFields}>
                    <NewListFormInputFields />
                    <SubmitButton />
                </div>
            </form>
        </FormProvider>
    );
};

export default NewListForm;
