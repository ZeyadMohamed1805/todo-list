import { useTranslation } from 'react-i18next';
import Input from '../../shared/input';
import { NEW_LIST_FORM_INPUT_FIELDS } from './NewListForm.constants';

export const NewListFormInputFields = () => {
  const { t } = useTranslation();

  return NEW_LIST_FORM_INPUT_FIELDS.map((field, index) => (
    <Input key={index} props={{ ...field, placeholder: t(field.placeholder) }} />
  ));
};
