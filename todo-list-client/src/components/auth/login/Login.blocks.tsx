import { useTranslation } from 'react-i18next';
import Input from '../../shared/input';
import { FORM_INPUT_FIELDS } from './Login.constants';
import Checkbox from '../../shared/checkbox';
import styles from './Login.module.scss';
import { Controller } from 'react-hook-form';

export const FormInputFields = () => {
  const { t } = useTranslation();

  return FORM_INPUT_FIELDS.map((field, index) => (
    <Input key={index} props={{ ...field, placeholder: t(field.placeholder) }} />
  ));
};


export const FormRememberMeCheckbox = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.rememberMeCheckbox}>
      <Controller 
        name="rememberMe"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            props={{
              isChecked: value,
              setIsChecked: () => onChange(!value),
              title: t("remember_me"),
            }}
          />
        )}
      />
      <span>{t("remember_me")}</span>
    </div>
  )
}