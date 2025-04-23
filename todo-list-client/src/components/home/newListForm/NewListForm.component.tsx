import { VariantsEnum } from '../../../enums/variants';
import SubmitButton from '../../shared/submitButton';
import { NewListFormInputFields } from './NewListForm.blocks';
import { useCreateNewList } from './NewListForm.hooks';
import styles from './NewListForm.module.scss';
import { FormProvider } from 'react-hook-form';

const NewListForm = () => {
  const createNewListData = useCreateNewList();

  return (
    <FormProvider {...createNewListData.formData}>
      <form className={styles.newListForm} onSubmit={createNewListData.onSubmit}>
        <div className={styles.formFields}>
          <NewListFormInputFields />
          <SubmitButton props={{ variant: VariantsEnum.SECONDARY }} />
        </div>
      </form>
    </FormProvider>
  );
};

export default NewListForm;
