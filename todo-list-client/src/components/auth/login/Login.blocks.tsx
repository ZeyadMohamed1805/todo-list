import { useTranslation } from 'react-i18next';
import Input from '../../shared/input';
import { FORM_INPUT_FIELDS } from './Login.constants';

export const FormInputFields = () => {
  const { t } = useTranslation();

  return FORM_INPUT_FIELDS.map((field, index) => (
    <Input key={index} props={{ ...field, placeholder: t(field.placeholder) }} />
  ));
};
