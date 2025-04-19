import Input from "../../shared/input";
import { FORM_INPUT_FIELDS } from "./Login.constants";
import styles from "./Login.module.scss";

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