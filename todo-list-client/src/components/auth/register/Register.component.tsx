import { FormProvider } from "react-hook-form";
import { FormFields } from "./Register.blocks";
import { useRegister } from "./Register.hooks";
import styles from "./Register.module.scss";

const Register = () => {
    const registerData = useRegister();

    return (
        <form className={styles.registerForm} onSubmit={registerData.onSubmit}>
            <FormProvider {...registerData.formData}>
                <FormFields />
            </FormProvider>
        </form>
    );
};

export default Register;