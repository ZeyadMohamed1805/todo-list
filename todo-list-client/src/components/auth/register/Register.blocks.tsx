import Input from "../../shared/input";
import { FORM_INPUT_FIELDS } from "./Register.constants";
import styles from "./Register.module.scss";

const FormInputFields = () => {
    return FORM_INPUT_FIELDS.map((field, index) => (
        <Input key={index} props={field} />
    ));
};

const FormSubmitButtonField = () => {
    return (
        <button type="submit" className={styles.submitButton}>
            Submit
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