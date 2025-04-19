import { useTranslation } from 'react-i18next';
import Input from '../../shared/input';
import { FORM_INPUT_FIELDS } from './Login.constants';
import styles from './Login.module.scss';

const FormInputFields = () => {
  const { t } = useTranslation();

  return FORM_INPUT_FIELDS.map((field, index) => (
    <Input key={index} props={{ ...field, placeholder: t(field.placeholder) }} />
  ));
};

const FormSubmitButtonField = () => {
  const { t } = useTranslation();

  return (
    <button type="submit" className={styles.submitButton}>
      {t('submit')}
    </button>
  );
};

export const FormFields = () => {
  return (
    <div className={styles.formFields}>
      <FormInputFields />
      <FormSubmitButtonField />
    </div>
  );
};
