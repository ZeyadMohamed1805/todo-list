import styles from './Login.module.scss';
import { FormInputFields, FormRememberMeCheckbox } from './Login.blocks';
import { useLogin } from './Login.hooks';
import { FormProvider } from 'react-hook-form';
import SubmitButton from '../../shared/submitButton';

const Login = () => {
  const loginData = useLogin();

  return (
    <FormProvider {...loginData.formData}>
      <form className={styles.loginForm} onSubmit={loginData.onSubmit}>
        <div className={styles.formFields}>
          <FormInputFields />
          <FormRememberMeCheckbox />
          <SubmitButton />
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
